/**
* Module dependencies.
*/

var fs = require('fs');
var home = require('home');
var mkdirp = require('mkdirp');

module.exports = credentials.bootstrap = credentials;

function credentials() {
    var path = home() + '/.credentials';

    fs.open(path, 'r', function (err, fd) {
        if (err) {
            credentials.bootstrap(path);
        }
    });
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
