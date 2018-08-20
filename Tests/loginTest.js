const login = require('../login');

login(function(result) {
    if (result.success)
        console.info('Login SUCCESS: Obtained sessionId ' + result.sessionId + ' and cookies.');
    else
        console.error('Login FAILURE: (' + result.status + ') ' + (result.error ? result.error : ''));
});