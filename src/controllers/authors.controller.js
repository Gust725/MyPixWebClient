const Remote1 = require('../../remote2')
const controller = {}

//Remote.LoginIn('selitzia@email.com','12345');
// const data = Remote1.LoginIn('selitzia@email.com','12345');

controller.getAllAuthors = (req, res) => {
    const data = Remote1.ListAuthors();
    data.then((value) => {
        // res.json(value);
        res.render('index', { value })
    });
}

module.exports = controller;