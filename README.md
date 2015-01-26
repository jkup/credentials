# Credentials

Be gentle with this one, I'm not quite sure what I'm doing!

## The Problem

[Keeping passwords in source control](http://ejohn.org/blog/keeping-passwords-in-source-control/) has been a long discussed problem. I have an interesting idea that I think could solve it.

## The Solution

Credentials is a node module (perhaps there should be a bash version as well) that stores all of your development credentials (API keys, passwords, etc) in a single JSON object in your home directory. That way everyone using this module as a dev dependency can use identical code to control customized credentials.

## Example

```js
var mysql       = require('mysql');
var credentials = require('credentials');

var connection = mysql.createConnection({
    host     : credentials.get('mysql', 'hostname'),
    user     : credentials.get('mysql', 'username'),
    password : credentials.get('mysql', 'password')
});

```

## The Approach

Currently, my thought is to keep a JSON file that tracks each app and it's appropriate credentials. Something like this:

```js
var credentials = {
    "mysql": {
        "hostname": "localhost",
        "username": "root_user",
        "password": "root_password"
    },
    "twitter_api": {
        "app_name": "sample_app",
        "api_key": "3949jakakjnsdlba",
        "api_secret": "3u429nsdbnfkjhb"
    }
}
```

## An Issue

One issue that was brought up is that there should be some way to namespace each app, otherwise you won't be able to use two different Twitter API keys for example.

## A Possible Solution

One thought I have is to create a separate file, as a key mapping individual apps to the credentials they need. This would look something like this:

```js
var credential_keys = {
    "mysql": {
        "some_side_project": true,
        "something_im_building": true,
        "a_work_project": true,
    },
    "twitter_api": {
        "some_work_thing": true
    },
    "other_twitter_api": {
        "some_fun_thing": true
    }
}
```

I'm not super thrilled with this approach, but it's what I'm going with unless someone comes up with something better!

## Contributing

At this time, I'm really looking for ideas on how to architect this and make it as usable as possible. Feel free to open an issue, submit a PR, or [find me on Twitter](https://twitter.com/jkup)!
