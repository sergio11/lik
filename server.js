// Babel ES6/JSX Compiler
require('babel-register');
//Core Node.js modules
var path = require('path');
//Third-party NPM libraries
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var express = require('express');
var logger = require('morgan');
var Rosetta = require('@schibstedspain/rosetta');
var Polyglot = require('@schibstedspain/rosetta/lib/adapters/polyglot')
var mongoose = require('mongoose');
//Application files
var routes = require('./app/routes');
var languages = require('./app/languages').default;
var config = require('./config');
//Routes
var character_routes = require('./routes/character_routes.js');
var report_routes = require('./routes/report_routes.js');
var stats_routes = require('./routes/stats_routes.js');


const i18n = new Rosetta.default({adapter: new Polyglot()});
i18n.languages = languages;
i18n.culture = 'es';
RouterContexti18n = i18n.addToContext(Router.RouterContext);

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Character Routes Handling.
app.use('/api/characters', character_routes.default);
//Report Routes Handling
app.use('/api/report', report_routes.default);
//Stats Routes Handling
app.use('/api/stats', stats_routes.default);

//Routing middleware
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      //That's because Babel Require Hook transforms only subsequent files, not current file
      //using JSX here will result in an illegal syntax error
      var html = ReactDOM.renderToString(React.createElement(RouterContexti18n, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

//Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;
  console.log("Nueva conexión ..");

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
