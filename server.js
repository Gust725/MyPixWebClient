const express = require('express');
const Remote1 = require('./remote2.js')
const app = express();

//Remote.LoginIn('selitzia@email.com','12345');
const data = Remote1.LoginIn('selitzia@email.com','12345');
//then

app.get('/', (req, res) => {
    data.then((value) => {
        // console.log(value);  
        res.json(value);
        // expected output: 123
    });
})

const PORT = 1234;

app.listen(PORT, (req, res) => {
    console.log("App listening on port: ", PORT)
})