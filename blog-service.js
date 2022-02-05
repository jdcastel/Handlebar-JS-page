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
//export to server.js
module.exports.posts = [];
module.exports.blog = [];
module.exports.categories = [];

const fs = require('fs/promises');

module.exports.initialize = function(){
    //This function will read the contents of the "./data/posts.json" file 
    try{
            fs.readFile('./data/posts.json', 'utf8', (err, data) => { 
        if (err) throw err;
        console.log(data);
        });
    }catch(err){
        console.log("unable to read file " + err.message);
    }

    posts = require('./data/posts.json')
    posts.forEach(i => {
        if(i.published == true){
        this.blog.push(i)
    }});
    
    this.categories = require('./data/categories.json');
    var that = this;
    return new Promise(function(resolve, reject){
            if(posts.length >0  && that.categories.length >0){
                resolve();
            }
            else{
                reject("unable to read file");
            }
    })
}

module.exports.getAllPosts = function (){
return new Promise(function(resolve, reject){
    if (this.posts.length > 0){
        resolve();
    }
    else{
      reject("no results returned");
         }
})
}
//provide an array of "post" objects whose published property is true using the resolve method of the returned promise.   
module.exports.getPublishedPosts = function (){
    var that = this;
    return new Promise(function(resolve, reject){
        if (that.blog.length > 0){
            resolve();
        }
        else{
            reject("no results returned");
        }
    })
    }

// full array of "category" objects using the resolve method of the  returned promise.   
module.exports.getCategories = function (){
    var that = this;
    return new Promise(function(resolve, reject){
        if (that.categories.length > 0){
            resolve();
         }
        else{
            reject();
        }
     })}