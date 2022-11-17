const express = require('express');
const path = require('path')
const app = express();


app.use(express.static(path.join(__dirname, './src/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));


const login_route = require('./src/routes/login.routes')

app.use('/',login_route);

const PORT = 1234;

app.listen(PORT, (req, res) => {
    console.log("App listening on port: ", PORT)
})