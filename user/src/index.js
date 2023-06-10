const app = require('./app');
const PORT = process.env.PORT || 8050;

app.listen(PORT);
console.log(`User service running on port ${PORT}`);