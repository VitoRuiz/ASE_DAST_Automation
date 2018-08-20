var fs = require('fs');
var FormData = require('form-data');
var request = require('request');
const path = require('path');

module.exports = {

    get: function (url, headers, callback) {

        request({
            headers: headers,
            url: url,
            method: "GET",
            json: true,
            rejectUnauthorized: false
        }, function (error, response, body) {
            callback(error, response, body);
        })

    },

    post: function (url, headers, body, callback) {
        request({
            headers: headers,
            url: url,
            method: "POST",
            json: true,
            body: body,
            rejectUnauthorized: false
        }, function (error, response, body) {
            callback(error, response, body);
        })
    },

    postMultipart: function (cookie, sessionId, url, body, fileLoc, callback) {

        fs.readFile(fileLoc, 'utf8', function (err, data) { //file data is stored in data param

            if (err) {
                callback(err, null, null);
                return;
            }

            //Construct the form, first with all of the body parameters, then with the file

            const fd = new FormData();

            const headers = {
                Cookie: cookie,
                asc_xsrf_token: sessionId,
                'Content-Type': 'multipart/form-data; boundary=' + fd.getBoundary(),
                Accept: "application/json, text/javascript, */*;q=0.01",
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en'
            };

            Object.keys(body).forEach(function (key) {
                const val = body[key];
                fd.append(key, (typeof val === 'object' ? JSON.stringify(val) : val));
            });

            fd.append('uploadedfile', data, {contentType: 'application/octet-stream', filename: path.basename(fileLoc)});

            request({
                headers: headers,
                url: url,
                method: "POST",
                json: false,
                body: fd,
                rejectUnauthorized: false
            }, function (error, response, body) {
                callback(error, response, body);
            })
        })

    }

};