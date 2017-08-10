let express           = require('express'),
    app               = express(),
    {config}          = require('./config'),
    morgan            = require('morgan'),
    path              = require('path'),
    express_validator = require('express-validator'),
    port              = config.port || 3000,
    server            = require('http').Server(app),
    bodyParser        = require('body-parser');


server.listen(port)
    .on('error', onError)
    .on('listening', onListening);

app.use(express.static(path.join(__dirname, './public')))
    .use(express_validator({}))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(morgan('dev'))
    .disable('x-powered-by');

require('./libraries/init')(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address(),
        bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

    console.log('Listening on ' + bind);
}
