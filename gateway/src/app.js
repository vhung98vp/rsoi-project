const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const ROUTES = require('./routes');
const authorize = require('./authorize');
const rsmq = require('./rsmq');
const STATISTIC_URL = process.env.STATISTIC_URL || 'http://localhost:8040';

const app = express();
app.use(morgan('combined'));
app.use(cors());

app.get('/manage/health', function(req, res) {
    return res.status(200).json({});
})

const statistic = function(req, res, next){
    const method = req.method;
    const url = req.originalUrl;
    //Send message
    let message = JSON.stringify({url: STATISTIC_URL + '/statistic', body: {url, method}} );
    console.log(message)
    rsmq.sendMessage({
        qname: "APPQUEUE",
        message: message,
        delay: 0
    }, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
    next();
}

ROUTES.forEach(item => {
    app.use(item.url, [authorize, statistic, createProxyMiddleware(item.options)])
})  

module.exports = app; 