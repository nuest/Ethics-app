var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/documents/";
var dir_2 = "/../../sql/queries/revisions/";
var dir_3 = "/../../sql/queries/descriptions/";
var query_get_document = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_revision = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_create_description_for_revision = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();


// POST TO REVISION (GERMAN)
exports.request = function(req, res) {

    async.waterfall([
        function(callback){
            // Connect to database
            pool.connect(function(err, client, done) {
                if(err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_document, [
                req.params.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Document exists
                    if (result.rows.length === 0) {
                        callback(new Error("Document not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Revision exists
                    if (result.rows.length === 0) {
                        callback(new Error("Revision not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // TODO: Add object/schema validation
            var object = {
                revision_id: req.params.revision_id,
                language: req.params.language,
                title: req.body.title,
                researcher: req.body.researcher,
                study_time: req.body.study_time,
                purpose: req.body.purpose,
                procedure: req.body.procedure,
                duration: req.body.duration,
                risks: req.body.risks,
                benefits: req.body.benefits
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_create_description_for_revision, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 201, result.rows[0]);
                }
            });
        }
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(result);
        }
    });
};