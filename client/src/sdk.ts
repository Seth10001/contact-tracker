import axios from 'axios'

const localCache = typeof global.localStorage !== "undefined" ? global.localStorage : ""

export const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        "password":  localCache ? localCache.getItem("password") : "",
        "username": localCache ? localCache.getItem("username") : "",
    }
});

export const changeContact = (createdAt: Date = new Date()) => {
    return api.post(
        "/api/contacts/change", {
            createdAt,
        }
    )
}

export const getLatestChange = () => {
    return api.get(
        "/api/contacts/change",{
            params: {
                limit: 1,
                order: JSON.stringify([[
                    "createdAt",
                    "DESC"
                ]])
            }
        }
    ).then((response) => {
        if (response.data.length < 1) {
            return null
        }
        return response.data[0]
    })
}

export const getAvailable = () => {
    return api.get("/api/contacts/available")
}

export const addContacts = (amount: number) => {
    return api.post("/api/contacts/add", {
        amount
    })
}
