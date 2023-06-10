const app = require('./app');
const PORT = process.env.PORT || 8070;

app.listen(PORT);
console.log(`Learn service running on port ${PORT}`);