const DB = require('./db.js');

const express = require('express');

const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const hubs = await DB.find(req.query);
            res.status(200).json(hubs)
        } catch(error) {
            console.log(error) 
            res.status(500).json({
                message: 'Error retrieving posts'
            })
        }
    })

    module.exports = router;