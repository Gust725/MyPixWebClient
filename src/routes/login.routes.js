const express = require('express');
const router = express.Router();
const author_controller = require('../controllers/authors.controller');

router.get('/', (req, res) => {
    // data.then((value) => {
    //     //res.json(value);

    // });
    res.render('login')
})

router.get('/authors', author_controller.getAllAuthors);

module.exports = router;