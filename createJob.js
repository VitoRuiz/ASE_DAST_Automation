const config = require('./config');
const http = require('./http');

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
        let bodyObj;
        if (!body || !(bodyObj = JSON.parse(body)).id) {
            callback({
                success: false,
                error: (error ? error : bodyObj.errorMessage),
                status: response.statusCode + ' ' + response.statusMessage
            });
        } else callback({
            success: true,
            newJobData: body
        });
    });

};