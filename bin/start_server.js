#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('apps:server');
var http = require('http');
var sequelize_fixtures = require('sequelize-fixtures');

var port = process.env.PORT || '3000';
app.set('port', port);


var server = http.createServer(app);

db.sequelize.sync().then(function() {
    sequelize_fixtures.loadFile('initial_data/processors.json', db).then(function(){
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
        console.log('Server listening for requests at port: ' + port);
    });
});

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error('User not authorized for this port.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    var addr = server.address();
    debug('Listening on port' + addr.port);
}
