const express = require('express');
const path = require('path')
const Remote1 = require('./remote2.js')
const ejs = require('ejs');
const app = express();

//Remote.LoginIn('selitzia@email.com','12345');
const data = Remote1.LoginIn('selitzia@email.com','12345');
//then
app.use(express.static(path.join(__dirname, './src/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.get('/', (req, res) => {
    data.then((value) => {
        //res.json(value);

    });
    res.render('login')
})

const PORT = 1234;

app.listen(PORT, (req, res) => {
    console.log("App listening on port: ", PORT)
})