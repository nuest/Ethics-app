var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

//var put = require('../controllers/comments/put');
var get_by_revision = require('../controllers/comments/get_by_revision');


// GET BY REVISION
router.get('/revisions/:revision_id/comments', isAuthenticated, get_by_revision.request);

// PUT (ONLY MEMBERS)
//router.put('/comments/:comment_id', isAuthenticated, put.request);


module.exports = router;
