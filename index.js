require('dotenv').config();
const server = require('./buildServer');

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`api listening on port: ${port}`));