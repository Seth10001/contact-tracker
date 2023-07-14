
import * as express from "express"
import { ModelRestApi } from 'sx-sequelize-api'
import ChangedContact from "../models/ChangedContact"
import BoughtContacts from "../models/BoughtContacts";
import connection from "../models"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

const changeContactApi = new ModelRestApi(ChangedContact, connection)
const boughtContactApi = new ModelRestApi(BoughtContacts, connection)

router.post("/change", changeContactApi.create())
router.get("/change", changeContactApi.getAll())
router.post("/add", boughtContactApi.create())

router.get("/available", async (req, res) => {
    const totalChanges = await ChangedContact.count()
    const totalBought = await BoughtContacts.sum("amount")

    res.json({
        available: totalBought - totalChanges
    })
})

export default router
