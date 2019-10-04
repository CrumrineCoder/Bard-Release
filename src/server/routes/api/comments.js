const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const Comments = mongoose.model('Comments');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const httpResponses = {
    onCommentSaveError: {
        success: false,
        message: 'Comment Error.'
    },
    onCommentSaveSuccess: {
        success: true,
        message: 'Comment added.'
    },
    onCommentsNotFound: {
        success: false,
        message: 'Comment not found.'
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
    app.post('/api/comments/postComment', checkToken, (req, res, next) => {
        let { comment, _id } = req.body;
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                let user = authorizedData.user;
                let commentToInsert = {
                    email: user.email,
                    text: comment
                }
                Comments.findOneAndUpdate(
                    { _id: _id },
                    {
                        postID: _id,
                        $push: {
                            comments: commentToInsert
                        }
                    },
                    {
                        upsert: true
                    },
                    function (error, success) {
                        if (error) {
                            return res.json(httpResponses.onCommentSaveError);
                        }
                        res.json(httpResponses.onCommentSaveSuccess);
                    },
                );

            }
        })
    });

    app.get('/api/comments/getCommentsForPost/:id', (req, res) => {
        Comments.find({
            postID: req.params.id
        }, function (error, comment) {
            if (error) throw error;
        //    console.log(comment);
            if (!comment) {
                return res.send(httpResponse.onCommentsNotFound);
            }

            return res.json({ success: true, comment })
        });
    });
    app.post('/api/comments/deleteComment', checkToken, (req, res, next) => {
        // let { tag, _id } = req.body;
    //    console.log(req.body);
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            Comments.findOneAndUpdate({
                "comments._id": req.body._id
            },
                {
                    $pull: {
                        "comments": {
                            "text": req.body.text
                        }
                    }
                },
                {
                    useFindAndModify: false
                },
                function (error, comment) {

                    if (error) {
                        console.log(error);
                        return res.json(httpResponses.onTagSaveError);
                    }
                    res.json(httpResponses.onCommentSaveSuccess);
                })
        })
    })

    app.post('/api/comments/editComment', checkToken, (req, res, next) => {
        // let { tag, _id } = req.body;
  //      console.log(req.body);
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            Comments.findOneAndUpdate({
                "comments._id": req.body._id
            },
                {
                    $set: {
                /*        "comments": {
                            "text": req.body.text, 
                            "email": req.body.email,
                            "_id": req.body._id
                        } */
                        "comments.$.text": req.body.text
                    }
                },
                {
                    useFindAndModify: false
                },
                function (error, comment) {

                    if (error) {
                        console.log(error);
                        return res.json(httpResponses.onCommentSaveError);
                    }
                    res.json(httpResponses.onCommentSaveSuccess);
                })
        }) 
    })
}