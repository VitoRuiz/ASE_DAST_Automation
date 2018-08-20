const login = require('../login');
const createJob = require('../createJob');

login(function(loginResult) {

    if (!loginResult.success) {
        console.error('Login failed during job creation: ' + loginResult.error);
        return;
    }

    //FILL IN TEST PARAMS
    const templateId = undefined;
    const testPolicyId = undefined;
    const folderId = undefined;
    const applicationId = undefined;
    const name = undefined;
    const description = undefined;
    const contact = undefined;
    const dastConfigFileLoc = undefined;

    createJob(loginResult.sessionId, loginResult.cookie, templateId, testPolicyId, folderId, applicationId, name, description, contact, dastConfigFileLoc, function (result) {
        if (result.success)
            console.info('Job creation SUCCESS: ' + result.newJobData);
        else
            console.error('Job creation FAILURE: (' + result.status + ') ' + (result.error ? result.error : ''));
    });

});