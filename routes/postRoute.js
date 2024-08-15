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

// To Post, Create post
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
});

// To Delete post
router.get('/delete/:postid', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postid);
        const user = await User.findById(post.user);
        // 
        await user.posts.pull(post._id);
        await user.save();
        res.redirect('/success');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// To Update post
// 1st 
router.get('/update/:postid', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postid);
        const user = await User.findById(post.user);
        res.render('updatePost', { post: post, user: user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// 2nd
router.post('/update/:postid', async(req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.postid, req.body, { new: true });
        res.redirect('/success');
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = router;