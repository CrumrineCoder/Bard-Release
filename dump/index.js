const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/users', require('../routes/api/users'));
router.use('/posts', require('../routes/api/posts'));
router.use('/comments', require('../routes/api/comments'));
router.use('/tags', require('../routes/api/tags'));
// router.use('/posts', passport.authenticate('jwt', {session: false}), require('./posts'));
module.exports = router;