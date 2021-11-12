const express = require('express')
const app = express()
const port = 3000


/*const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : 'pg',
      port : 3306,
      user : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB
    }
  });
*/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})