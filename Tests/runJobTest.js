const login = require('../login');
const runJob = require('../runJob');

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