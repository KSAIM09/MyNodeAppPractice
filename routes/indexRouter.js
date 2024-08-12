const express = require("express");
const router = express.Router();
const User = require('../models/userSchema')


// Routes
router.get('/', async (req, res) => {
    // res.send("HomePage"); We can render a page also

    // this will render ejs page!
    // res.render('index');   

    // we will add some data to front back from out database
    try {
        const users = await User.find().select("+password")
        // .select("+password")--will show password also if we want to otherwise dont write it
        res.render('index', { users: users });
    } catch (error) {
        res.status(500).send("Check Your DATABASE", error.message);
    }
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


// To delete The Data using (anchor tag) get method
router.get("/delete/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/success');
    } catch (error) {
        res.status(500).send("Check Your DATABASE",error.message)
    }
})

// To update the User's details we make Two new routes 1st for getting the details and showing,
// 2nd to update that detials

// 1st
router.get("/update/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("+password");
        res.render('update', { user: user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 2nd
router.post("/update/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/success');
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;
