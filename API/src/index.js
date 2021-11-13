const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
//accolades voor enkel direct aanspreken functie
const {
    createTable, getData, idValidation, getPost, postValidation, updatePost, deletePost
} = require('./helpers/dbhelper.js')

// middleware
var jsonParser = bodyParser.json();

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
    getData(pg).then(data => {
        res.json(data)
    })  
})
app.get('/table/:id', idValidation, (req, res) => {
    getPost(pg, req.params.id).then(post => {
        res.json(post)
    })
})

app.put('/table/:id', jsonParser , (req, res, next) => {
    updatePost(pg, req.params.id, req.body).then(data => {
        res.json(data);
    })
})

app.delete('/table/:id', (req, res) => {
    deletePost(pg, req.params.id).then(table => {
        res.json(table);
    })
})

app.listen(port, () => {
    /*console.log(`Example app listening at http://localhost:${port}`)*/
})

createTable(pg);

module.exports = app