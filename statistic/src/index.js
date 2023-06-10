const app = require('./app');
const PORT = process.env.PORT || 8040;

app.listen(PORT);
console.log(`Statistic service running on port ${PORT}`);