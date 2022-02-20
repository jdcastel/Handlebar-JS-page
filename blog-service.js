/*********************************************************************************
*  WEB322 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: JUAN DAVID RODRIGUEZ CASTELBLANCO Student ID: 147891204 Date: 05/02/2022
*
*  Online (Heroku) URL: https://radiant-fortress-88225.herokuapp.com/about
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

     module.exports.addPost = (postData) => {
        return new Promise((resolve, reject) => {
            //o	If postData.published is undefined, explicitly set it to false, otherwise set it to true (this gets around the issue of the checkbox not sending "false" if it's unchecked)
            postData.published = (postData.published) ? true : false;
            postData.id = (posts.length + 1);
            posts.push(postData);
            //o	Push the updated PostData object onto the "posts" array and resolve the promise with the updated postData value (ie: the newly added blog post).
            resolve(posts[posts.length - 1]);
        });
    }
       //•	This function will provide an array of "post" objects whose category property matches the category parameter 
    module.exports.getPostsByCategory = (category) => { 
        return new Promise((resolve, reject) => {
            let postfilter = posts.filter(a => a.category == category);
            if (postfilter.length == 0) {
                reject("no results returned"); return;
            } 
           resolve(postfilter);     
        })
    };
    //•	This function will provide an array of "post" objects whose postDate property represents a Date 
    module.exports.getPostsByMinDate = (minDateStr) => {
        return new Promise((resolve, reject) => {
            let filterdate = posts.filter(a => new Date(a.postDate) > new Date(minDateStr));
           
            if (filterdate.length == 0) {
                reject("no results returned"); return;
            } 
            resolve(filterdate);
        });
    }
    //	This function will provide a single "post" object whose id property matches the id parameter 
    module.exports.getPostById = (id) => {
        return new Promise((resolve, reject) => {
            let filterbyID = posts.filter(a => a.id == id);
            
            if (filterbyID.length == 0) {
                reject("no results returned"); return;
            } 
           resolve(filterbyID);     
        })
    }
    