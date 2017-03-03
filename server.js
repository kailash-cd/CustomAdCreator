/**
 * Module dependencies
*/
var express  = require('express');


var http = require('http');
var path = require('path');
var uuid = require('node-uuid');

var vhost = 'nodejsapp.local';
var port     = process.env.PORT || 8082;
var ip     = process.env.IP || "localhost";
var environment = process.env.ENV|| 'development';
console.log("Application Environment :::",environment)
//var port = 8085;


var serverInfo = {};
serverInfo.environment = environment;
 serverInfo.apiHost ="54.225.122.8"; //"localhost";//;

if(environment === "production") {
    serverInfo.selfPort = 80;
    serverInfo.backend_port = 7700;

} else if(environment === "staging") {
    serverInfo.selfPort = 8085;
    serverInfo.backend_port = 6600;

} else {
    serverInfo.selfPort = 8080;
    serverInfo.backend_port = 6600;

}


var app = express();
app.configure(function() {
    // set up our express application
    app.set('port', serverInfo.selfPort);
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    // app.use(express.bodyParser()); // get information from html forms
    app.set('view engine', 'html'); // set up html for templating
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.session({ secret: 'keyboard cat' }));// persistent login sessions
    app.use(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(app.router); //init routing

});

//var connection = require('./config/database')(mongoose);
//var models = require('./models/models')(connection);
require('./app/routes.js')(app,serverInfo); // load our routes and pass in our app and fully configured passport

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

//express.vhost(vhost, app);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});
