const express = require("express");
const router = express.Router();
const User = require('../models/userSchema')


// Routes
router.get('/', (req, res) => {
    // res.send("HomePage"); We can render a page also

    // this will render ejs page!
    res.render('index');   
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/success', (req, res)=> {
    res.render('success');
})

// DATA ROUTES
// extra,,, data will be shown in url while using GET method.
router.get('/save', (req, res) => {
    res.json({ data: req.query });
})
// we dont want to Show data in our url so we use POST method here.
router.post('/save', async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/success');
    } catch (error) {
        res.status(500).send("Check Your DATABASE",error.message);
    }
})




module.exports = router;
