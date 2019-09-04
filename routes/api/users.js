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
  }
}

module.exports = (app) => {

  //POST new user route (optional, everyone has access)
  app.post('/api/users', auth.optional, (req, res, next) => {
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

          return finalUser.save()
            .then(() => res.json({ success: true, user: finalUser.toAuthJSON() }));
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
              jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err) }
                return res.json({ success: true, token: 'JWT ' + token });
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
  app.get('/api/users/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
    console.log(payload);
    return Users.findById(id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(400);
        }

        return res.json({ user: user.toAuthJSON() });
      });
  });
}