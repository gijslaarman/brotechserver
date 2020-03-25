const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const port = process.env.PORT

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'default', layoutsDir: `${__dirname}/views/layouts/` }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.use('/', require('./routes/home'))
app.use('/carousel', require('./routes/carousel'))
app.use('/showcase', require('./routes/showcase'))

app.listen(port, (err) => {
    if (err) throw new Error(err)

    MongoClient.connect(`${process.env.DB_URL}:${process.env.DB_PORT}`, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw new Error(err)
        db = client.db('BT')
    })

    console.log(`Listening on port: ${port}`)
})