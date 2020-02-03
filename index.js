const express = require('express')
const app = express()
const cors = require('cors')
const BodyParser = require('body-parser')

const PORT = 2020 || process.env.PORT

app.use(cors())
app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())
app.use(express.static('public'))

