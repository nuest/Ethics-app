var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var pool = require('../server.js').pool;
var server_url = require('../server.js').server_url;
var jwtSecret = require('../server.js').jwtSecret;

var fs = require("fs");
var dir_1 = "/../sql/queries/documents/";
var dir_2 = "/../sql/queries/users/";
var query_get_document = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();


// LOGIN (DOCUMENT)
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
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, callback) {
            // Database query
            client.query(query_get_user, [
                document.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if User exists
                    if (result.rows.length === 0) {
                        callback(new Error("User not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, user, callback){
            // Create payload
            payload = {
                iss: server_url,
                name: user.title + ' ' + user.first_name + ' ' + user.last_name,
                email_address: user.email_address,
                committee: false,
                admin: false,
                exp: moment().add(1, 'days').format('x')
            };
            // Create JWT
            user.token = jwt.sign(payload, jwtSecret);
            callback(null, 200, user);
        },
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(result);
        }
    });
};
