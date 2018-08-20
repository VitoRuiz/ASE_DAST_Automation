const config = require('./config');
const http = require('./http');
const login = require('./login');

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

//TEST - invoke this file directly with node to test
login(function(loginResult) {

    if (!loginResult.success) {
        console.error('Login failed during job creation: ' + loginResult.error);
        return;
    }

    const jobId = 1652;

    queryJob(loginResult.sessionId, loginResult.cookie, jobId, function(result) {
        if (result.success)
            console.info('Job query SUCCESS: Obtained etag (including quotes) ' + result.etag);
        else
            console.error('Job query FAILURE: (' + result.status + ') ' + (result.error ? result.error : ''));
    });

});