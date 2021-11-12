const express = require('express')
const app = express()
const port = 3000
//accolades voor enkel 1 funcie te importeren
const {
    createTable
} = require('./helpers/dbhelper.js')


const pg = require('knex')({
    client: 'postgres',
    connection: {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/table', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

createTable(pg);
