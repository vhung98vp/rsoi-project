const express = require('express');
const category = require('./routes/category');
const set = require('./routes/set');

const app = express();
app.use(express.json());

app.use('/set', set);
app.use('/category', category);
app.get('/manage/health', function(req, res) {
    return res.status(200).json({});
})

module.exports = app;