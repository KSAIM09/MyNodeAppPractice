
const dotenv = require("dotenv");
dotenv.config({ path: "./.env"});

const express = require("express");
const app = express();

const indexRouter = require('./routes/indexRouter');
const postRoute = require('./routes/postRoute');

const path = require("path");



// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// FOR DATA
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./models/dbConnect');

// STATIC FILE
app.use(express.static(path.join(__dirname, "public")));


// Routes
app.use("/", indexRouter);
// Post Route
app.use("/post", postRoute);


// Server listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})