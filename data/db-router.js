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
                error: "The posts information could not be retrieved."
            })
        }
    });

    router.get('/:id', async (req, res) => {
        
        try {
            const hub = await DB.findById(req.params.id);
            
            if(hub) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
        } 
            } catch(error) {
                console.log(error);
                res.status(500)({
                    message: "The post information could not be retrieved."
                })
            }
    
    });

    router.post('/', async (req, res) => {
        const { title, contents } = req.body;

        if (!title && !contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            return; 
        }
        
        try {
            const hub = await DB.insert(req.body);
            res.status(201).json(hub); 
        } catch(error) {
            console.log(error);
            res.status(500)({
                error: "There was an error while saving the post to the database"
            })
        }
    })

    module.exports = router;