const express = require('express');
const user = require('./routes/user');

const app = express();
app.use(express.json());

app.use('/user', user);
app.get('/manage/health', function(req, res) {
    return res.status(200).json({});
})

module.exports = app;