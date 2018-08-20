const login = require('../login');
const createJob = require('../createJob');

login(function(loginResult) {

    if (!loginResult.success) {
        console.error('Login failed during job creation: ' + loginResult.error);
        return;
    }

    const templateId = 1622;
    const testPolicyId = 20;
    const folderId = 5;
    const applicationId = 1018;
    const name = 'Vito Test 30';
    const description = 'Test Description';
    const contact = 'Test Contact';
    const dastConfigFileLoc = '/Users/vruiz/Desktop/8088.dast.config';

    createJob(loginResult.sessionId, loginResult.cookie, templateId, testPolicyId, folderId, applicationId, name, description, contact, dastConfigFileLoc, function (result) {
        if (result.success)
            console.info('Job creation SUCCESS: ' + result.newJobData);
        else
            console.error('Job creation FAILURE: (' + result.status + ') ' + (result.error ? result.error : ''));
    });

});