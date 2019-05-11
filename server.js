const express = require('express');

const DBRouter = require('./data/db-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', DBRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Welcome</h1>
    `)
})

module.exports = server;