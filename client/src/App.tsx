import React from 'react';
import './App.css';
import { getLatestChange, changeContact, addContacts, getAvailable } from './sdk'

const DAYS_TIL_REPLACEMENT = 14

export default function App() {
  const [eyeCareInfo, setEyeCareInfo] = React.useState<EyeCareInfo>()
  const [contactsLeft, setContactsLeft] = React.useState(0)
  const [showReplaceForm, setReplaceForm] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getEyeCareInfo()
    .then(setEyeCareInfo)
    .finally(() => setLoading(false))

    getAvailable()
    .then((res) => setContactsLeft(res.data['available']))
  }, [])

  if (loading || eyeCareInfo === undefined) {
    return <p>Loading..</p>
  }

  const today = new Date()
  const lastContactChange = new Date(eyeCareInfo.lastContactChange)
  const difference = today.getTime() - lastContactChange.getTime()
  //(1000 milliseconds * (60 seconds * 60 minutes) * 24 hours)
  const daysDifference = Math.floor(difference / (1000 * (60 * 60) * 24));
  let percentComplete: number
  if (daysDifference < DAYS_TIL_REPLACEMENT) {
    percentComplete = ((daysDifference)/DAYS_TIL_REPLACEMENT)*100
  }
  else {
    percentComplete = 100
  }

  return (
    <div>
      <h1 className="text-center">Contact Replacement Tracker</h1>
      <p className="text-center">
        Date of last replacement {lastContactChange.toLocaleDateString()}
      </p>
      <p className="text-center">
        Contacts Available: {contactsLeft}
      </p>
      {!showReplaceForm ? <>
      {/* Source: https://heyoka.medium.com/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72  */}
      <svg id="tracker-wheel" className="m-auto" width="100%" height="100%" viewBox="0 0 42 42">
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="#fff"
        />

        <circle
          className="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#d2d3d4"
          strokeWidth="3"
        />

        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#3227a9"
          strokeWidth="3"
          strokeDasharray={`${percentComplete} ${100 - percentComplete}`}
          strokeDashoffset="25"
        />

        <text
          x="21"
          y="21"
          textAnchor="middle"
          fontSize="2px"
        >
          {daysDifference < DAYS_TIL_REPLACEMENT ? <>
            Replace in {DAYS_TIL_REPLACEMENT - daysDifference} days
          </>
          : <>
            Replace now
          </>}
        </text>
      </svg>

      <button
        className="btn m-auto"
        onClick={() => {
          const data = {
            lastContactChange: new Date().toJSON()
          }
          updateEyeCareInfo(data)
          window.location.reload()
        }}
      >
        Changed Contact Today
      </button>
      <button
        className="btn m-auto mt-5"
        onClick={() => setReplaceForm(true)}
      >
        Add Contacts
      </button>
      </> : <>
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            const input = event.currentTarget[0] as HTMLInputElement
            await addContacts(parseInt(input.value))

            window.location.reload()
          }}
        >
          <label
            className='m-auto'
            style={{
              width: 'fit-content'
            }}
          >Number of Contacts Purchased</label>
          <input name="amount" className='m-auto mt-5' type="number"></input>
          <button
            className="btn m-auto mt-5"
            onClick={() => setReplaceForm(true)}
          >
            Submit +
          </button>
        </form>
      </>}
    </div>
  );
}


interface EyeCareInfo {
  lastContactChange: string //JSON date
}
const EYE_CARE_STORAGE_NAME = "eyeCareInfo"

async function getEyeCareInfo(): Promise<EyeCareInfo> {
  let eyeCare = localStorage.getItem(EYE_CARE_STORAGE_NAME)

  if (eyeCare) {
    const { lastContactChange } = JSON.parse(eyeCare)
    await changeContact(lastContactChange)
    localStorage.removeItem(EYE_CARE_STORAGE_NAME)
  }

  const latest = await getLatestChange()
  if (!getLatestChange) {
    return Promise.resolve({
      lastContactChange: new Date("2000-01-01").toJSON()
    })
  }

  return {
    lastContactChange: latest["createdAt"]
  }
}

function updateEyeCareInfo(data: EyeCareInfo) {
  changeContact()
}
