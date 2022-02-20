/*********************************************************************************
*  WEB322 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: JUAN DAVID RODRIGUEZ CASTELBLANCO Student ID: 147891204 Date: 05/02/2022
*
*  Online (Heroku) URL: https://radiant-fortress-88225.herokuapp.com/about
*
********************************************************************************/ 
//The server must listen on process.env.PORT || 8080 
const HTTP_PORT = process.env.PORT || 8080;
console.log("Express http server listening on " + HTTP_PORT)
//The server must make use of the "express" module 
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer();// no { storage: storage } since we are not using disk storage
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const path = require("path");

const blogService = require('./blog-service.js');
const posts = require("./data/posts.json");
const categories = require("./data/categories.json");
const { rmSync } = require("fs");
//middleware
app.use(express.static('public'));

//The route "/" must redirect the user to the "/about"
app.get("/", (req, res) => {

    res.redirect("/about")
});

app.get('/about', function(req, res){ 
    res.sendFile(__dirname +"/views/about.html");
}); 

app.get('/blog', function(req, res){ 
    blogService.getPublishedPosts().then(
        function(val){ res.send(blogService.blog);},
    ).catch(function(err){console.log(err.message)});
}); 

app.get('/posts', function(req, res){ 
    blogService.getAllPosts().then(
        function(val){ res.send(posts); },
    ).catch(function(err){console.log(err.message)});
});

app.get('/categories', function(req, res){ 
    blogService.getCategories().then(
        function(val){res.send(blogService.categories);},
    ).catch(function(err){console.log(err.message)});
}); 
//
app.get("/posts/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addPost.html"));
});

cloudinary.config({
    cloud_name: 'dg21qlo6p',
    api_key: '861694287883439',
    api_secret: 'a6THW0KwsT0AA2Y46cGcVu6dqPI',
    secure: true
});

app.post('/posts/add', upload.single("featureImage"), (req, res) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let streamUpload = cloudinary.uploader.upload_stream(
                    (err, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(err);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(streamUpload);
            });
        };

        async function upload(req) {
            let x = await streamUpload(req);
            return x;
        }
        upload(req).then((uploaded) => {
            processPost(uploaded.url);
        });
    } else {
        processPost("");
    }

    function processPost(imageUrl) {
        req.body.featureImage = imageUrl;
        // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts
        blogService.addPost(req.body).then(() => {
            res.redirect("/posts");
        }).catch(err => {
            res.status(404).send(err);
        })
    }
});

app.get('/post/:value', (req, res) => {
    blogService.getPostById(req.params.value).then((data) => {
        res.json({data});
    }).catch(err => {
        res.json({ message: err});
    });
});

app.get("/posts", (req, res) => {
    //•	In addition to providing all of the posts, this route must now also support the following optional filters (via the query string)  
    let categoryData = req.query.category;
    let minDate = req.query.minDate;
    if (categoryData) {
        blogService.getPostsByCategory(categoryData).then(data => {
            res.send(data);
        }).catch(err=>{
            res.send({message: err});
        });
    }
    //	return a JSON string consisting of all posts whose postDate 
    else if (minDate != "" && minDate != null) {
        blogService.getPostsByMinDate(minDate).then(data => {
            res.send(data);
        }).catch(err=>{
            res.send({message: err});
        });
    }
    else {
        blogService.getAllPosts().then(data => {
            res.send(data);
        }).catch(err=>{
            res.send({message: err});
        })
    }
});

// "Page Not Found" with an HTTP status code of 404.   
app.use((req, res) => {
    res.status(404);
  });

// setup http server to listen on HTTP_PORT
// app.listen(HTTP_PORT);
blogService.initialize().then(
    function(val){console.log("Loading...");app.listen(HTTP_PORT);}
).catch(function(err){console.log(err)});