import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from 'dotenv'
import {urlTable} from "./db.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

let connectionUrl = process.env.MONGO
async function main() { 

    await mongoose.connect(connectionUrl)

    app.get('/', async (req, res) => {
        let key = req.query.key
        const go = await urlTable.findOne({ token: key })
        console.log(go);
        res.json(go)

    })

    app.post('/', async (req, res) => {
        // generaate a unique token
        // make a new entry in db
        // return the token in response
        const url = req.body.url
        const getUniqueToken = async () => {
            const token = Math.random().toString(36).substring(2, 8)
            const entry = await urlTable.findOne({token: token})
            if (entry) {
                return getUniqueToken()
            }
            else{
                return token
            }
        }
        const token = getUniqueToken()
        const entry = urlTable.create({token, url})
        return res.json(token)
    })

    app.get('/check', async (req, res) => {
        const token = req.query.token  
        
    })
    app.listen(3000)
}
main()
