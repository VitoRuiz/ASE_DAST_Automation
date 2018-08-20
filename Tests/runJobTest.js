const login = require('../login');
const runJob = require('../runJob');

login(function(loginResult) {

    if (!loginResult.success) {
        console.error('Login failed during job creation: ' + loginResult.error);
        return;
    }

    //FILL IN TEST PARAMS
    const jobId = undefined;
    const etag = undefined;

    runJob(loginResult.sessionId, loginResult.cookie, jobId, etag, function(result) {
        if (result.success) {
            console.info('Run job SUCCESS');
        } else {
            console.error('Run job FAILURE: ' + result.status);
        }
    })

});