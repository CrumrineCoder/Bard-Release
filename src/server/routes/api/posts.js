const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const Posts = mongoose.model('Posts');
const Words = mongoose.model('Words');
const auth = require('../auth');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const httpResponses = {
    onValidationError: {
        success: false,
        message: 'Please enter link.'
    },
    onPostSaveError: {
        success: false,
        message: 'That email address already exists.'
    },
    onPostsNotFound: {
        success: false,
        message: 'Posts not found.'
    },
    onPostSaveSuccess: {
        success: true,
        message: 'Successfully created new post.'
    },
    onPostAlreadyMade: {
        success: false,
        message: "Post already made."
    }
}

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    //   console.log("header", header)
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        //    console.log("bearer", bearer);
        const token = bearer[1];
        //    console.log("token", token);
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}
module.exports = (app) => {
    //POST new user route (optional, everyone has access)
    app.post('/api/posts/createPost', checkToken, (req, res, next) => {
        let { link, source, name } = req.body;
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            console.log("Test")
            console.log(req.token)
            console.log(process.env.SECRET)
            console.log(authorizedData)
            if (err) {
                //If error send Forbidden (403)
                console.log(err)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                let user = authorizedData.user;

                let newPost = new Posts({
                    link: link,
                    email: user.email,
                    source: source,
                    name: name
                });

                Posts.find({ source: source, name: name }, function (err, docs) {
                    if (docs.length) {
                        console.log("Already eixsts")
                        return res.json(httpResponses.onPostAlreadyMade);
                    } else {
                        // Attempt to save the user
                        newPost.save(error => {
                            if (error) {
                                return res.json(httpResponses.onPostSaveError);
                            }
                            res.json(httpResponses.onPostSaveSuccess);
                        });
                    }
                })
            }
        })
    });


    app.get("/api/posts/checkSource/:sourceToFind", (req, res) => {
        let sourceToFind = req.params.sourceToFind;
        var re = new RegExp("^" + sourceToFind)
        Words.find({ '_id': re, "value.Src": "Post" }, function (error, source) {
            if (error) throw error;

            if (!source) {
                return res.send(httpResponse.onTagsNotFound);
            }

            return res.json({ success: true, source, message: "Check sources done." })
        }, { _id: 1 })
    })


    app.get('/api/posts/getAllPosts', (req, res) => {
        Posts.find({
        }, function (error, post) {
            if (error) throw error;

            if (!post) {
                return res.send(httpResponse.onPostsNotFound);
            }

            return res.json({ success: true, post, message: "Get all posts done." });

        }).sort({ _id: -1 });
    });

    app.post('/api/posts/getPostById', (req, res) => {
        //  console.log(req.params)
       // let ids = req.body.split(",");
       let ids = req.body;
        Posts.find({
            "_id": { "$in": ids }
        }, function (error, post) {
            //  console.log(post);
            if (error) throw error;

            if (!post) {
                return res.send(httpResponse.onPostsNotFound);
            }
            post.reverse();

            return res.json({ success: true, post, message: "Posts found." })
        })
    });


    app.post('/api/posts/editPost', checkToken, (req, res, next) => {
        // let { tag, _id } = req.body;
       // console.log(req.body);
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            Posts.findOneAndUpdate({
                "_id": req.body._id
            },
                {
                    $set: {
                        "link": req.body.link,
                        "source": req.body.source, 
                        "name": req.body.name
                    }
                },
                {
                    useFindAndModify: false
                },
                function (error, post) {

                    if (error) {
                        console.log(error);
                        return res.json(httpResponses.onPostSaveError);
                    }
                    res.json(httpResponses.onPostSaveSuccess);
                })
        })  
    })

    
}