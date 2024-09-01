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
        const body = req.body   
        await urlTable.create(body)
        return res.json('Done')
      
    })
    app.get('/check', async (req, res) => {
        const token = req.query.token  
        const checktab = await urlTable.findOne({ token: token})
        if (checktab){
            res.json(true)
        }
        else{
            res.json(false)
        }
    })
    app.listen(3000)
}
main()
