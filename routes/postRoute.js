const express = require("express");
const router = express.Router();

const User = require('../models/userSchema');
const Post = require('../models/postSchema');

// Routes
router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get("/create/:userid", (req, res)=> {
    res.render("createPost", { userid: req.params.userid });
})

// To Post
router.post("/create/:userid", async (req, res) => {
       try {
        const newPost = new Post(req.body);
        newPost.user = req.params.userid;
        const post = await newPost.save();
        // 
        const user = await User.findById(req.params.userid);
        user.posts.push(post._id);
        await user.save();
        // 
        res.redirect('/success');
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;