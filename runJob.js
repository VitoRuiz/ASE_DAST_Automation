const config = require('./config');
const http = require('./http');
const login = require('./login');

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

//TEST - invoke this file directly with node to test
login(function(loginResult) {

    if (!loginResult.success) {
        console.error('Login failed during job creation: ' + loginResult.error);
        return;
    }

    const jobId = 1652;
    const etag = '"6cd07572d0db218be49850523b771fe2"';

    runJob(loginResult.sessionId, loginResult.cookie, jobId, etag, function(result) {
        if (result.success) {
            console.info('Run job SUCCESS');
        } else {
            console.error('Run job FAILURE: ' + result.status);
        }
    })

});