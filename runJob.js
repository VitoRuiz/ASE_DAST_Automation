const config = require('./config');
const http = require('./http');

const runJob = module.exports = function(sessionId, cookie, jobId, etag, callback) {

    const body = {
        type: 'run'
    };

    const headers = {
        Cookie: cookie,
        asc_xsrf_token: sessionId,
        "If-Match": etag
    };

    http.post(config.ASEURL + '/jobs/' + jobId + '/actions', headers, body, function(error, response, body) {
        if (response.statusCode !== 200) {
            callback({
                success: false,
                status: response.statusCode + ' ' + response.statusMessage
            });
        } else callback({
            success: true
        });
    });

};