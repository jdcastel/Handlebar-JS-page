/*********************************************************************************
*  Name: JUAN DAVID RODRIGUEZ CASTELBLANCO 
*  Online (Heroku) URL: https://whispering-waters-31442.herokuapp.com/
********************************************************************************/ 

const Sequelize = require('sequelize');

var sequelize = new Sequelize('dfhftchi7rvu9f', 'mrsmltcaodgktx', '425300236306d04109e55c5261d48c173bc1665a5b272a6784585a3091356f66', 
{
    host: 'ec2-52-3-60-53.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});


const Post = sequelize.define('Post', {
    body: Sequelize.TEXT,
    title: Sequelize.STRING,
    postDate: Sequelize.DATE,
    featureImage: Sequelize.STRING,
    published: Sequelize.BOOLEAN
});


const Category = sequelize.define('Category', {
    category: Sequelize.STRING
});


Post.belongsTo(Category, {
    foreignKey: 'category'
});

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync()
            .then(() => {
                resolve("database synced");
            })
            .catch(() => {
                reject("unable to sync database");
            })
    });
};

//export to server.js
module.exports.posts = [];
module.exports.blog = [];
module.exports.categories = [];


module.exports.getAllPosts = function () {
    return new Promise(function (resolve, reject) {
        Post.findAll()
            .then((data) => {
                let error = 5 / 0;
                resolve(data);
            })
            .catch(() => {
                reject("no results returned");
            })
    });
};

//provide an array of "post" objects whose published property is true using the resolve method of the returned promise.   
module.exports.getPublishedPosts = function () {
    return new Promise((resolve, reject) => {
        Post.findAll({
            where: {
                published: true
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no results returned")
            })
    });
}

// full array of "category" objects using the resolve method of the  returned promise.   
module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
        Category.findAll()
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no results returned");
            })
    });
}
//Adding the property "postDate" to your postData object before you push it to the "posts" array. 
     module.exports.addPost = (postData) => {
        return new Promise((resolve, reject) => {
            postData.published = (postData.published) ? true : false;
            for (const prop in postData) {
                if (postData[prop] === "") { 
                    postData[prop] = null; 
                }
            }
            postData.postDate = new Date();
            Post.create(postData)
                .then(resolve())
                .catch(reject('error creating a post'))
        });
    };
       //•	This function will provide an array of "post" objects whose category property matches the category parameter 
    module.exports.getPostsByCategory = (category) => { 
        return new Promise(function (resolve, reject) {
            Post.findAll({
                where: {
                    category: category
                }
            })
                .then((data) => {
                    resolve(data);
                })
                .catch(() => {
                    reject("no results returned")
                })
        });
    };

    //•	This function will provide an array of "post" objects whose postDate property represents a Date 
    module.exports.getPostsByMinDate = (minDateStr) => {
    return new Promise((resolve, reject) => {
        const { gte } = Sequelize.Op;
        Post.findAll({
            where: {
                postDate: {
                    [gte]: new Date(minDateStr)
                }
            }
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject("no results returned");
        });
    });
}
    //	This function will provide a single "post" object whose id property matches the id parameter 
    module.exports.getPostById = (id) => {
        return new Promise(function (resolve, reject) {
            Post.findAll({
                where: {
                    id: id
                }
            })
                .then((data) => {
                    resolve(data[0]); // there is only one result
                })
                .catch(() => {
                    reject("no results returned")
                })
        });
    }
    
    //This function works exactly as getPublishedPosts() except that in addition to filtering by "post.published == true"
    module.exports.getPublishedPostsByCategory = (category) => {
        return new Promise((resolve, reject) => {
            Post.findAll({
                where: {
                    published: true,
                    category: category
                }
            })
                .then((data) => {
                    resolve(data);
                })
                .catch(() => {
                    reject("no results returned")
                })
        });
    }

    module.exports.addCategory = (categoryData) => {
        return new Promise(function (resolve, reject) {
            for (var a in categoryData) {
                if (categoryData[a] == "") {
                    categoryData[a] = null;
                }
            }
            Category.create(categoryData)
            .then(resolve())
            .catch(reject('error creating category'))
        });
    };

    module.exports.deleteCategoryById = (id) => {
        return new Promise((resolve,reject) => {
            Category.destroy({
                where: {
                    id: id
                } })
            .then(resolve())
            .catch(reject('error removing category'))
        })
    };

    module.exports.deletePostById = (id) => {
        return new Promise((resolve,reject) => {
            Post.destroy({
                where: {
                    id: id  } })
            .then(() => {
                resolve() })
            .catch(() => {
                reject('error removing post') })
        })
    };
    
