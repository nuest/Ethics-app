var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/members/";
var dir_2 = "/../../sql/queries/documents/";
var query_get_member = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_search_documents_with_user = fs.readFileSync(__dirname + dir_2 + 'search_with_user.sql', 'utf8').toString();
var query_search_documents_with_user_with_course = fs.readFileSync(__dirname + dir_2 + 'search_with_user_with_course.sql', 'utf8').toString();
var query_search_documents_with_user_without_course = fs.readFileSync(__dirname + dir_2 + 'search_with_user_without_course.sql', 'utf8').toString();
var query_search_documents_filter_by_status = fs.readFileSync(__dirname + dir_2 + 'search_filter_by_status.sql', 'utf8').toString();
var query_search_documents_filter_by_status_and_status = fs.readFileSync(__dirname + dir_2 + 'search_filter_by_status_and_status.sql', 'utf8').toString();
var query_search_documents_filter_by_status_with_course = fs.readFileSync(__dirname + dir_2 + 'search_filter_by_status_with_course.sql', 'utf8').toString();
var query_search_documents_filter_by_status_and_status_with_course = fs.readFileSync(__dirname + dir_2 + 'search_filter_by_status_and_status_with_course.sql', 'utf8').toString();
var query_search_documents_filter_by_status_without_course = fs.readFileSync(__dirname + dir_2 + 'search_filter_by_status_without_course.sql', 'utf8').toString();
var query_search_documents_filter_by_status_and_status_without_course = fs.readFileSync(__dirname + dir_2 + 'search_filter_by_status_and_status_without_course.sql', 'utf8').toString();


// SEARCH ALL
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
            // Authorization
            if(req.headers.authorization) {
                var token = req.headers.authorization.substring(7);

                // Verify token
                jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
                    if(err){
                        callback(new Error("Authorization failed"), 401);
                    } else {
                        if(decoded.member){
                            // Database query
                            client.query(query_get_member, [
                                decoded.member_id
                            ], function(err, result) {
                                done();
                                if (err) {
                                    callback(err, 500);
                                } else {
                                    // Check if Member exists
                                    if (result.rows.length === 0) {
                                        callback(new Error("Member not found"), 404);
                                    } else {
                                        callback(null, client, done, result.rows[0]);
                                    }
                                }
                            });
                        } else {
                            callback(new Error("Authorization failed"), 401);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed"), 401);
            }
        },
        function(client, done, member, callback) {

            var query;
            var params = [];

            // Pagination parameters
            params.push(Number(req.query.offset) || null );
            params.push(Number(req.query.limit) || null );

            // Sorting
            params.push(req.query.orderby || 'created.desc');

            // Filter by institute
            params.push(member.institute_id);

            // Filter with/without course
            query = query_search_documents_with_user;
            switch(req.query.course){
                case 'true': {
                    query = query_search_documents_with_user_with_course;
                    break;
                }
                case 'false': {
                    query = query_search_documents_with_user_without_course;
                    break;
                }
                default: {
                    query = query_search_documents_with_user;
                }
            }

            // Filter by status
            switch(req.query.status){
                case '0': {
                    params.push(0);
                    break;
                }
                case '1': {
                    params.push(1);
                    break;
                }
                case '2': {
                    params.push(2);
                    break;
                }
                case '3': {
                    params.push(3);
                    break;
                }
                case '4': {
                    params.push(4);
                    break;
                }
                case '5': {
                    params.push(5);
                    break;
                }
                case '6': {
                    params.push(6);
                    break;
                }
                case '7': {
                    params.push(7);
                    break;
                }
                case '8': {
                    params.push(2);
                    params.push(6);
                    break;
                }
            }

            // Filter by status with/without course
            if(req.query.status){
                // Check for status
                if(params.length === 6){
                    query = query_search_documents_filter_by_status_and_status;
                } else {
                    query = query_search_documents_filter_by_status;
                }
                // Check for course
                switch(req.query.course){
                    case 'true': {
                        // Check for status
                        if(params.length === 6){
                            query = query_search_documents_filter_by_status_and_status_with_course;
                        } else {
                            query = query_search_documents_filter_by_status_with_course;
                        }
                        break;
                    }
                    case 'false': {
                        // Check for status
                        if(params.length === 6){
                            query = query_search_documents_filter_by_status_and_status_without_course;
                        } else {
                            query = query_search_documents_filter_by_status_without_course;
                        }
                        break;
                    }
                }
            }

            // Prepare search-query
            if(!req.body.search_text || req.body.search_text === ""){
                callback(new Error("No search text found"), 400);
            } else {
                var search_text = req.body.search_text;
                var search_array = search_text.split(' ');
                var search_query_text = "";

                for(var i=0; i<search_array.length; i++){
                    if(i !== search_array.length-1){
                        search_query_text = search_query_text + search_array[i] + ":*|";
                    } else {
                        search_query_text = search_query_text + search_array[i] + ":*";
                    }
                }

                params.push(search_query_text);

                callback(null, client, done, query, params);
            }

        },
        function(client, done, query, params, callback) {
            // Database query
            client.query(query, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 200, result.rows);
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
