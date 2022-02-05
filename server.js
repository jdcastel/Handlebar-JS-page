/*********************************************************************************
*  WEB322 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: JUAN DAVID RODRIGUEZ CASTELBLANCO Student ID: 147891204 Date: 20/01/2022
*
*  Online (Heroku) URL: https://young-harbor-17894.herokuapp.com/
*
********************************************************************************/ 
//The server must listen on process.env.PORT || 8080 
const HTTP_PORT = process.env.PORT || 8080;
console.log("Express http server listening on " + HTTP_PORT)
//The server must make use of the "express" module 
const express = require("express");
const app = express();
const blogService = require('./blog-service');
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
// "Page Not Found" with an HTTP status code of 404.   
app.use((req, res) => {
    res.status(404);
  });

// setup http server to listen on HTTP_PORT
// app.listen(HTTP_PORT);
blogService.initialize().then(
    function(val){console.log("Loading...");app.listen(HTTP_PORT);}
).catch(function(err){console.log(err)});