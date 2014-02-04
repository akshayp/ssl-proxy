#!/usr/bin/env node

var path  = require('path'),
    fs    = require('fs'),
    httpProxy = require('http-proxy'),
    proxyPort = 4080,
    sslDir = process.env.HOME,
    host = '127.0.0.1',
    port = '3000',
    ssl = {
        key: fs.readFileSync(path.join(sslDir, '.ssl', 'server.key'), 'utf8'),
        cert: fs.readFileSync(path.join(sslDir, '.ssl', 'server.crt'), 'utf8')
    };
    
// Require app
process.env.NODE_ENV="production";
var app = require('../../salcap/app');

// Start Proxy
var proxy = httpProxy.createServer({
    target: {
        host: host,
        port: port
    },
    ssl: ssl
}).listen(proxyPort);


console.log('\u001b[1m' + '\u001b[35m' + 'SSL Proxy ' + '\u001b[32m' + 'server listening on port ' + proxyPort + '\u001b[0m');

proxy.on('error', function(e) {
    console.log(e);
});