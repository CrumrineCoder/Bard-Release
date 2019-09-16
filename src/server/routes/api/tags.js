const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const Comments = mongoose.model('Comments');
const Tags = mongoose.model('Tags');
const Words = mongoose.model('Words');
const auth = require('../auth');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const httpResponses = {
    onTagSaveError: {
        success: false,
        message: 'Tag Error.'
    },
    onTagSaveSuccess: {
        success: true,
        message: 'Tag added.'
    },
    onTagsNotFound: {
        success: false,
        message: 'Tag not found.'
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
    app.get('/api/tags/getTagsForPost/:id', (req, res) => {
        Tags.find({
            postID: req.params.id
        }, function (error, tag) {
            if (error) throw error;

            if (!tag) {
                return res.send(httpResponse.onTagsNotFound);
            }

            return res.json({ success: true, tag })
        });
    });

    app.get('/api/tags/searchPostsByTag/:tag', (req, res) => {
        let tags = req.params.tag.split(",");

        Tags.find({
            "tags.text": { "$all": tags }
        }, function (error, tag) {
            //      console.log(tag);
            if (error) throw error;

            if (!tag) {
                return res.send(httpResponse.onTagsNotFound);
            }

            return res.json({ success: true, tag, message: "Search by tag done." })
        })
    });

    app.get("/api/tags/checkTags/:tagToFind", (req, res) => {
        let tagToFind = req.params.tagToFind;
        var re = new RegExp("^" + tagToFind)
        Words.find({ '_id': re, "value.Src": "Tag" }, function (error, tag) {
            if (error) throw error;

            if (!tag) {
                return res.send(httpResponse.onTagsNotFound);
            }

            return res.json({ success: true, tag, message: "Check tags done." })
        }, { _id: 1 })
    })

    //POST new user route (optional, everyone has access)
    app.post('/api/tags/postTag', checkToken, (req, res, next) => {
        let { tag, _id } = req.body;
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                let user = authorizedData.user;
                let email = user.email;

                let tagToInsert = {
                    emails: [email],
                    text: tag
                }

                Tags.findOneAndUpdate(
                    {
                        postID: _id,
                        "tags.emails": { "$nin": [email] },
                        "tags.text": tag
                    },
                    {
                        "$push": {
                            "tags.$.emails": email
                        }
                    },
                    {
                        useFindAndModify: false
                    },
                    function (error, success) {
                        if (success === null || success === undefined) {
                            Tags.findOneAndUpdate(
                                {
                                    _id: _id,
                                    "tags.text": { "$ne": tag }
                                },
                                {
                                    postID: _id,
                                    $addToSet: {
                                        tags: tagToInsert
                                    }
                                },
                                {
                                    upsert: true,
                                    useFindAndModify: false
                                },
                                function (error, success) {
                                    if (error) {
                                        return res.json(httpResponses.onTagSaveError);
                                    }
                                    res.json(httpResponses.onTagSaveSuccess);
                                }
                            )
                        } else {
                            if (error) {
                                return res.json(httpResponses.onTagSaveError);
                            }
                            res.json(httpResponses.onTagSaveSuccess);
                        }
                    }
                )
            }
        })
    });

}