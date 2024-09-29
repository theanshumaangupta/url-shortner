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
        // req.body = {url}
        async function gene() {
            let b = Math.random().toString(36).substring(2, 8)
            const checktab = await urlTable.findOne({ token: b})
            if (checktab){
                gene()
            }
            else{      
                const body = req.body
                body.token = b
                await urlTable.create(body)
                return res.json(b)
            }
        }
        gene()

    })

    app.get('/check', async (req, res) => {
        const token = req.query.token  
        
    })
    app.listen(10000)
}
main()
