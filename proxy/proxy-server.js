var express = require('express');

var { createProxyMiddleware } = require('http-proxy-middleware');
var app = express();

app.use('/api', createProxyMiddleware({ target: 'http://100.98.97.86:8000', changeOrigin: true }));

app.listen(8000);