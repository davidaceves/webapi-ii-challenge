const DB = require('./db.js');

const express = require('express');

const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const posts = await DB.find(req.query);
            res.status(200).json(posts)
        } catch(error) {
            console.log(error) 
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        }
    });

    router.get('/:id', async (req, res) => {
        
        try {
            const post = await DB.findById(req.params.id);
            
            if (!post.length) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
                
            } else {
                res.status(200).json(post);
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
        
        try {
            if (!title || !contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." }); 
            } else {
                const post = await DB.insert(req.body);
                res.status(201).json(post); 
            }
           
        } catch(error) {
            console.log(error);
            res.status(500)({
                error: "There was an error while saving the post to the database"
            })
        }
    })

    router.delete('/:id', async (req, res) => {
        try {
            const post = await DB.remove(req.params.id); 
            if (post) {
                res.status(200).json({
                    message: "The post was deleted."
                })
            } else {
                res.status(404).json({
                    error: "The post with the specified ID does not exist."
                });
            }
        } catch(error) {
            res.status(500)({
                error: "The post could not be removed"
            });
        }
    })

    router.put('/:id', async (req, res) => {
        try {
            const post = await DB.update(req.params.id, req.body);
            
            const { title, contents } = req.body; 

            if (!post){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else if (!title || !contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                }) 
            } else {
                res.status(200).json(post)
            }
            } catch(error) {
                res.status(500)({
                error: "The post information could not be modified."  
                });
            }
    })

    module.exports = router;