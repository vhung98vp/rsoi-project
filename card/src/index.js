const app = require('./app');
const PORT = process.env.PORT || 8060;

app.listen(PORT);
console.log(`Card service running on port ${PORT}`);