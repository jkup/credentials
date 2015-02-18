/**
* Module dependencies.
*/

var fs = require('fs');
var home = require('home');

exports.get = function(app_name, field) {
    var path = home() + '/.credentials';

    fs.open(path, 'r', function (err, fd) {
        if (err) {
            console.error('Credential files have not been created yet, please see [doc]')
        }
    });

    var keys = app_name.split('.');

    var obj = JSON.parse(fs.readFileSync(home() + '/.credentials/credentials_apps.json', 'utf8'));

    var new_keys = obj[keys[0]][keys[1]].split('.');

    var new_obj = JSON.parse(fs.readFileSync(home() + '/.credentials/credentials.json', 'utf8'));

    return new_obj[new_keys[0]][new_keys[1]][field];
}
