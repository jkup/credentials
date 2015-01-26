/**
* Module dependencies.
*/

var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = credentials.getHome = credentials.bootstrap = credentials;

function credentials() {
    var path = credentials.getHome() + '/.credentials';

    fs.open(path, 'r', function (err, fd) {
        if (err) {
            credentials.bootstrap(path);
        }
    });
}

credentials.getHome = function() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

credentials.bootstrap = function(path) {
    mkdirp(path);

    var key = {
        "current": "mysql"
    };

    var obj = {
        "mysql": {
            "username": "Jon"
        }
    };

    fs.writeFile(path + '/CREDENTIAL_KEY', JSON.stringify(key), function(err) {
        if (err) throw err;
    });

    fs.writeFile(path + '/CREDENTIAL_OBJ', JSON.stringify(obj), function(err) {
        if (err) throw err;
    });
}
