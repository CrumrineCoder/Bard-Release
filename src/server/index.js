const express = require('express');
const os = require('os');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
var cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler');

var MongoClient = require('mongodb').MongoClient


require('dotenv').config();




const isDev = process.env.NODE_ENV !== 'production';

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;


MongoClient.connect(process.env.DATABASE, function (err, client) {
    if (err) throw err

    var db = client.db('music');

    db.collection("tags").mapReduce(
        // Map function
        function () {
            // We need to save this in a local var as per scoping problems
            var document = this;
            // You need to expand this according to your needs
            var stopwords = ["the", "this", "and", "or"];

            for (var prop in document) {

                if (prop != "tags") {
                    continue
                }
                for (var i = 0; i < document[prop].length; i++) {
                    emit(document[prop][i].text, document._id)
                }
                // We are only interested in strings and explicitly not in _id

            }
        },
        // Reduce function
        function (k, v) {
            return { k, v }
            // Kind of ugly, but works.
            // Improvements more than welcome!
            var values = { 'documents': [] };
            v.forEach(
                function (vs) {
                    if (values.documents.indexOf(vs) > -1) {
                        return
                    }
                    values.documents.push(vs)
                }
            )
            return values
        },

        {
            // We need this for two reasons...
            finalize:

                function (key, reducedValue) {
                    return { "Src": "Tag" }
                    // First, we ensure that each resulting document
                    // has the documents field in order to unify access
                    var finalValue = { documents: [] }

                    // Second, we ensure that each document is unique in said field
                    if (reducedValue.documents) {

                        // We filter the existing documents array
                        finalValue.documents = reducedValue.documents.filter(

                            function (item, pos, self) {

                                // The default return value
                                var loc = -1;

                                for (var i = 0; i < self.length; i++) {
                                    // We have to do it this way since indexOf only works with primitives

                                    if (self[i].valueOf() === item.valueOf()) {
                                        // We have found the value of the current item...
                                        loc = i;
                                        //... so we are done for now
                                        break
                                    }
                                }

                                // If the location we found equals the position of item, they are equal
                                // If it isn't equal, we have a duplicate
                                return loc === pos;
                            }
                        );
                    } else {
                        finalValue.documents.push(reducedValue)
                    }
                    // We have sanitized our data, now we can return it        
                    return finalValue

                },
            // Our result are written to a collection called "words"
            out: { reduce: "words" }
        }
    )


    db.collection("posts").mapReduce(
        // Map function
        function () {
            // We need to save this in a local var as per scoping problems
            var document = this;
            // You need to expand this according to your needs
            var stopwords = ["the", "this", "and", "or"];

            for (var prop in document) {

                if (prop != "source") {
                    continue
                }

                emit(document[prop], document._id)

                // We are only interested in strings and explicitly not in _id

            }
        },
        // Reduce function
        function (k, v) {
            return { k, v }
            // Kind of ugly, but works.
            // Improvements more than welcome!
            var values = { 'documents': [] };
            v.forEach(
                function (vs) {
                    if (values.documents.indexOf(vs) > -1) {
                        return
                    }
                    values.documents.push(vs)
                }
            )
            return values
        },

        {
            // We need this for two reasons...
            finalize:

                function (key, reducedValue) {
                    return { "Src": "Post" }
                    // First, we ensure that each resulting document
                    // has the documents field in order to unify access
                    var finalValue = { documents: [] }

                    // Second, we ensure that each document is unique in said field
                    if (reducedValue.documents) {

                        // We filter the existing documents array
                        finalValue.documents = reducedValue.documents.filter(

                            function (item, pos, self) {

                                // The default return value
                                var loc = -1;

                                for (var i = 0; i < self.length; i++) {
                                    // We have to do it this way since indexOf only works with primitives

                                    if (self[i].valueOf() === item.valueOf()) {
                                        // We have found the value of the current item...
                                        loc = i;
                                        //... so we are done for now
                                        break
                                    }
                                }

                                // If the location we found equals the position of item, they are equal
                                // If it isn't equal, we have a duplicate
                                return loc === pos;
                            }
                        );
                    } else {
                        finalValue.documents.push(reducedValue)
                    }
                    // We have sanitized our data, now we can return it        
                    return finalValue

                },
            // Our result are written to a collection called "words"
            out: { reduce: "words" }
        }
    )
})

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

app.use(session({ secret: process.env.SECRET, cookie: { maxAge: 60000, secure: false }, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
if (isDev) {
    app.use(errorHandler());
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// API routes

require('./models/Comments')
require('./models/Posts')
require('./models/Tags')
require('./models/Users')
require('./models/Words')
require('./config/passport');
require('./routes')(app);

app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
