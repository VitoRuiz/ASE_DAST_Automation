const login = require('../login');
const queryJob = require('../queryJob');

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