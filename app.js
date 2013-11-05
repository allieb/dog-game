var connect = require ('connect');
var http = require ('http');

var app = connect ()
    .use (connect.favicon ())
    .use (connect.logger ())
    .use (connect.static (__dirname + '/public'), {redirect:true})
    .use (function (req, res){
        res.end ('Hello world!');
    });

http.createServer (app).listen (8080);
