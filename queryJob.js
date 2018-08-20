const config = require('./config');
const http = require('./http');

const queryJob = module.exports = function(sessionId, cookie, jobId, callback) {

    http.get(cookie, sessionId, config.ASEURL + '/jobs/' + jobId, function(error, response, body) {

        if (!body || !body.id) {
            callback({
                success: false,
                error: (error ? error : body),
                status: response.statusCode + ' ' + response.statusMessage
            })
        } else callback({
            success: true,
            jobData: body,
            etag: response.headers.etag
        });

    });

};