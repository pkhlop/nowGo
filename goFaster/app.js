
var express = require('express'),
    fs = require('fs'),
    routes = require('./routes'),
    api = require('./routes/api'),
    path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

// SERVER CONFIGURATION

app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view options', {
    layout: false
});
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname + '/public')));
app.use(app.router);

if(app.get('env') === 'development') {
    app.use(express.errorHandler());
}

if (app.get('env') === 'production') {

}


app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// ROUTES

app.get('/', routes.index);


// redirect all others to the index (HTML5 history)

app.get('*', routes.index);

// START SERVER

app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});

