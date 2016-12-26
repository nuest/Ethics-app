var express = require('express');
var router = express.Router();

// var list = require('../controllers/documents/list');
var post = require('../controllers/documents/post');
var get = require('../controllers/documents/get');
var put = require('../controllers/documents/put');
// var del = require('../controllers/documents/delete');



// LIST
// router.get('/documents', list.request);

// POST
router.post('/users/:user_id/documents', post.request);

// GET
router.get('/documents/:document_id', get.request);

// PUT
router.put('/documents/:document_id', put.request);

// DELETE
// router.delete('/documents/:document_id', del.request);


module.exports = router;