require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const db = require('./db.js')
db.connect()

const todoRouter = require('./routes/todos')
app.use('/todos', todoRouter)

const port =3000 || process.env.PORT
app.listen(port, () => {
    console.log("Listening on port ", port)
})