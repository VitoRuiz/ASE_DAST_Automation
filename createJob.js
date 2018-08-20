const config = require('./config');
const http = require('./http');
const login = require('./login');

const createJob = module.exports = function(sessionId, cookie, templateId, testPolicyId, folderId, applicationId, name, description, contact, fileLoc, callback) {

    const url = config.ASEURL + '/jobs?templateId=' + templateId;

    const body = {
        asc_xsrf_token : sessionId,
        jobDetails : {
            testPolicyId : testPolicyId,
            folderId : folderId,
            applicationId : applicationId,
            name : name,
            description : description,
            contact : contact
        }
    };

    http.postMultipart(cookie, sessionId, url, body, fileLoc, function(error, response, body) {
        if (!body || !(JSON.parse(body)).id) {
            callback({
                success: false,
                error: (error ? error : body)
            });
        } else callback({
            success: true,
            newJobData: body
        });
    });

};

//TEST - invoke this file directly with node to test
login(function(loginResult) {

    if (!loginResult.success) {
        console.error('Login failed during job creation: ' + loginResult.error);
        return;
    }

    const templateId = 1622;
    const testPolicyId = 20;
    const folderId = 5;
    const applicationId = 1018;
    const name = 'Vito Test 29';
    const description = 'Test Description';
    const contact = 'Test Contact';
    const dastConfigFileLoc = '/Users/vruiz/Desktop/8088.dast.config';

    createJob(loginResult.sessionId, loginResult.cookie, templateId, testPolicyId, folderId, applicationId, name, description, contact, dastConfigFileLoc, function (result) {
        if (result.success)
            console.info('Job creation SUCCESS: ' + result.newJobData);
        else
            console.error('Job creation FAILURE: ' + result.error);
    });

});