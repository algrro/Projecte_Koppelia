var express = require('express')
require('dotenv').config()
var sequelize = require('./Config')
var cors = require("cors")
var app = express()

// allow cors
app.use(cors({
    'Access-Control-Allow-Origin': 'https://localhost:4000/'
}))

const port = process.env.PORT || 9999

app.get('/favicon.ico', (_, res) => res.sendStatus(204))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

main = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    app.use(require("./Routes"))
    app.listen(port, async () => {
        console.log('Server listening on port ' + port)
    })
}

main()
