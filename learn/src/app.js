const express = require('express');
const history = require('./routes/history');

const app = express();
app.use(express.json());

app.use('/history', history);
app.get('/manage/health', function(req, res) {
    return res.status(200).json({});
})

module.exports = app;