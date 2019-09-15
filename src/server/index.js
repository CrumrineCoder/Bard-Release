const express = require('express');
const os = require('os');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
var cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler');

require('dotenv').config();




const isDev = process.env.NODE_ENV !== 'production';

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

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
