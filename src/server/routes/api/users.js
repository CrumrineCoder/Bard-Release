const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
var userModel = new Users;

require('dotenv').config();

const httpResponse = {
  onUserNotFound: {
    success: false,
    message: 'User not found.'
  },
  onUserExists: {
    success: false,
    message: "User already exists"
  },
  onAuthenticationFail: {
    success: false,
    message: 'Passwords did not match.'
  },
  missingEmail: {
    success: false,
    message: "An email is required"
  },
  missingPassword: {
    success: false,
    message: "A password is required"
  },
  onSuccessfulRegister: {
    success: true,
    message: "User registered."
  }
}

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
  app.post('/api/users/register', auth.optional, (req, res, next) => {
    const user = req.body;
    const email = user.email;
    const password = user.password;
    if (!email) {
      return res.json(httpResponse.missingEmail);
      /*return res.status(422).json({
        errors: {
          email: 'is required',
        },
      }); */
    }

    if (!password) {
      return res.json(httpResponse.missingPassword)
      /*
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
      */
    }
    Users.findOne({ email })
      .then((potentialUser) => {
        if (potentialUser) {
          return res.json(httpResponse.onUserExists);
        } else {
          const finalUser = new Users(user);

          finalUser.setPassword(password);
          finalUser.save();
          return res.json(httpResponse.onSuccessfulRegister);
        }
      });
  });

  //POST login route (optional, everyone has access)
  app.post('/api/users/login', auth.optional, (req, res, next) => {
    const user = req.body;
    const email = user.email;
    const password = user.password;
    if (!email) {
      return res.json(httpResponse.missingEmail);
      /*return res.status(422).json({
        errors: {
          email: 'is required',
        },
      }); */
    }

    if (!password) {
      return res.json(httpResponse.missingPassword)
      /*
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
      */
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

      if (err) {
        return next(err);
      }

      req.login(user, { session: false }, (err) => {
        Users.findOne({ email })
          .then((user) => {
            if (!user) {
              return res.json(httpResponse.onUserNotFound);
            } else if (!user.validatePassword(password)) {
              return res.json(httpResponse.onAuthenticationFail);
            } else {
              jwt.sign({ user }, process.env.SECRET, {}, (err, token) => {
                if (err) { console.log(err) }
                return res.json({ success: true, token: 'JWT ' + token, message: "User login" });
              });
            }
          });
        if (err) {
          res.send(err);
        }
      });
    })(req, res, next);
  });

  //GET current route (required, only authenticated users have access)
  /*app.get('/api/users/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
    console.log(payload);
    return Users.findById(id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(400);
        }
        console.log(user);
        return res.json({ user: user.toAuthJSON() });
      });
  }); */
  app.get('/api/users/current', checkToken, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
      //    console.log(authorizedData)
      if (authorizedData) {
        let user = authorizedData.user.email;
        // return authorizedData.user.email;
        return res.json({ success: true, user, message: "User found." })
      } else{
        return res.json({success: false, message: "User not found."})
      }
    });
  });
}