/*********************************************************************************
*  WEB322 – Assignment 4
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

const { get } = require("express/lib/response");
const fs = require("fs");
const { resolve } = require("path");

let posts = [];
let categories = [];
module.exports.initialize = function () {
        //This function will read the contents of the "./data/posts.json" file 
    return new Promise((resolve, reject) => {
        fs.readFile("./data/posts.json", "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                posts = JSON.parse(data);
                resolve();
            }
        });
        fs.readFile("./data/categories.json", "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                categories = JSON.parse(data);
                resolve();
            }
        });
    });
}

module.exports.getAllPosts = function () {
    return new Promise((resolve, reject) => {
        if (posts.length == 0) {
            reject("no results returned");
        } else {
            resolve(posts);
        }
    });
}
//provide an array of "post" objects whose published property is true using the resolve method of the returned promise.   
module.exports.getPublishedPosts = function () {
    return new Promise((resolve, reject) => {
        if (posts.length == 0) {
            reject("no results returned");
        } else {
            resolve(posts);
        }
    });
}
// full array of "category" objects using the resolve method of the  returned promise.   
module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
        if (categories.length == 0) {
            reject("no results returned");
        } else {
            resolve(categories);
        }
    });
}
//Adding the property "postDate" to your postData object before you push it to the "posts" array. 
     module.exports.addPost = (postData) => {
        return new Promise((resolve, reject) => {
            postData.published = (postData.published) ? true : false;
            const date = new Date();
            const postedDate = `${date.getFullYear()}-${
                (date.getMonth() < 10 ? "0" : "") + ((date.getMonth()+1))
            }-${(date.getDate() < 10 ? "0" : "") + date.getDate()}`;
            postData.postDate = postedDate;
            postData.id = (posts.length + 1);
            posts.push(postData);
            resolve(posts[posts.length - 1]);
        });
    }
       //•	This function will provide an array of "post" objects whose category property matches the category parameter 
    module.exports.getPostsByCategory = (category) => { 
        return new Promise((resolve, reject) => {
            let postfilter =  posts.filter(a => a.category == category);
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
                reject("no results returned"); 
                return;
            } 
            resolve(filterdate);
        });
    }
    //	This function will provide a single "post" object whose id property matches the id parameter 
    module.exports.getPostById = (id) => {
        return new Promise((resolve, reject) => {
            let filterbyID = posts.filter(a => a.id == id);
            if (filterbyID.length == 0) {
                reject("no results returned"); 
                return;
            } 
           resolve(filterbyID[0]);     
        })
    }
    
    //This function works exactly as getPublishedPosts() except that in addition to filtering by "post.published == true"
    module.exports.getPublishedPostsByCategory = (category) => {
        return new Promise((resolve, reject) => {
            let publishedPosts = posts.filter(post => post.published == true && post.category == category);
    
            if (publishedPosts.length == 0) {
                reject("no results returned"); return;
            } 
           resolve(publishedPosts);     
        })
    }