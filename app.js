/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , sessionStore = new express.session.MemoryStore({reapInterval: 60000 * 10});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    store: sessionStore,
    key: 'sid',
    secret: 'your_session_secret'
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

io.set('authorization', function (handshakeData, calback) {
    if (!handshakeData.headers.cookie)
        return calback('No cookie transmitted.', false);

    var signedCookies = require('express/node_modules/cookie').parse(handshakeData.headers.cookie);
    handshakeData.cookies = require('express/node_modules/connect/lib/utils').parseSignedCookies(signedCookies, 'your_session_secret');
    handshakeData.sessionID = handshakeData.cookies['sid'];
    handshakeData.sessionStore = sessionStore;
    sessionStore.get(handshakeData.sessionID, function (err, session) {
        if (err || !session) {
            calback('Error: No such session', false);
        } else {
            handshakeData.session = session;
            calback(null, true);
        }
    });
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

