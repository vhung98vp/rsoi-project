const express = require('express');
const statistic = require('./routes/statistic');

const app = express();
app.use(express.json());

app.use('/statistic', statistic);
app.get('/manage/health', function(req, res) {
    return res.status(200).json({});
})

module.exports = app;