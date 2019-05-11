const express = require('express');

const PostRouter = require('./data/db-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Welcome</h1>
    `)
})

module.exports = server;