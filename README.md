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
    host     : credentials.get('myApp.mysql', 'hostname'),
    user     : credentials.get('myApp.mysql', 'username'),
    password : credentials.get('myApp.mysql', 'password')
});

```

## The Approach

The current idea is to keep two JSON files. One that contains all the local credentials, and one that grants individial apps access to specific credentials. Something like this:

credentials.json
```json
{
  "mysql" :  {
    "root" : {
      "host" : "localhost",
      "user" : "root",
      "password" : "rootpassword"
    },
    "work_user" : {
      "host" : "localhost",
      "user" : "bob",
      "password" : "bobspassword"
    }
  },
  "twitter_api" : {
    "work" : {
      "app_name" : "work_app",
      "api_key": "3949jakakjnsdlba",
      "api_secret": "3u429nsdbnfkjhb"
    },
    "side_project" : {
      "app_name" : "sample_app",
      "api_key": "3949jakakjnsdlba",
      "api_secret": "3u429nsdbnfkjhb"
    }
  }
}
```

credentials_apps.json
```json
{
  "work_app" : {
    "mysql" : "mysql.work_user",
    "twitter_api" : "twitter_api.work"
  },
  "myApp" : {
    "mysql" : "mysql.root",
    "twitter_api" : "twitter_api.side_project"
  },
  "another_personal_app": {
    "mysql" : "mysql.sudo"
  }
}
```

This allows reusing credentials between apps, while only storing any credential once. The downsides are that it requires two files and increases complexity.
I'm not super thrilled with this approach, but it's what I'm going with unless someone comes up with something better!

## Contributing

At this time, I'm really looking for ideas on how to architect this and make it as usable as possible. Feel free to open an issue, submit a PR, or [find me on Twitter](https://twitter.com/jkup)!
