import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import { connectToDB } from './lib/connectToDB'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
const app = express()
const port = process.env.PORT || 3012
import postRouter from './routes/post'

connectToDB()
const connection = mongoose.connection

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/post',postRouter)

if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.join(path.resolve(),'..','frontend','dist')))

    app.get('*',(req:Request,res:Response) => {
        res.sendFile(path.join(path.resolve(),'..','frontend','dist','index.html'))
    })
}

connection.once('open', () => {
    console.log(`connected to database`)
    app.listen(port , () => console.log(`app is alive at http://localhost:${port}`))
})