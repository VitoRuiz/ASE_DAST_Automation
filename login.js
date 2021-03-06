const http = require('./http');
const config = require('./config');

const login = module.exports = function(callback) {

//Log in, retrieving the session ID and the cookies needed for future operations

    const postBody = {
        userId: config.ASEUserID,
        password: config.ASEPass,
        featureKey: "AppScanEnterpriseUser"
    };

    http.post(config.ASEURL + '/login', {}, postBody,  function(error, response, body) {

        if (!body || !body.sessionId || !response.headers['set-cookie']) {
            callback({
                success: false,
                error: (error ? error : body.errorMessage),
                status: response.statusCode + ' ' + response.statusMessage
            });
        } else callback({
            success: true,
            sessionId: body.sessionId,
            cookie: response.headers['set-cookie']
        });
    });

};