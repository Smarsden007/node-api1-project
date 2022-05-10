const express = require('express')

const User = require('./users/model')

const server = express()
server.use(express.json())



server.delete('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
    if (!possibleUser) {
        res.status(404).json({
            message: 'The user wuth the specified ID does not exist',
        })
    } else {
        const deletedUser = await User.remove(possibleUser.id)
        res.status(200).json(deletedUser)
    }
    } catch (err) {
        res.status(500).json({
            message: 'error creating user',
            err: err.message,
            stack: err.stack,
            });
    }
});

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(422).json({
            message: 'name and bio required'
        })
    } else {
    User.insert(user)
    .then(createdUser => {
        res.status(201).json(createdUser)

    })
    .catch(err => {
        res.status(500).json({
        message: 'error creating user',
        err: err.message,
        stack: err.stack,
        });
    })
    }
});

server.get('/api/users', (req, res) =>{
    User.find()
    .then(users => {
        res.json(users)
    })
        .catch(err => {
            res.status(500).json({
            message: 'error getting users',
            err: err.message,
            stack: err.stack,
        });
    });
});

server.get('/api/users/:id', (req, res) =>{
    User.findById(req.params.id)
    .then(users => {
        if (!user) {
            res.status(404).json({
                message: " The use with the specified ID does not exist"
            })
        }
    })
        .catch(err => {
            res.status(500).json({
            message: 'error getting user',
            err: err.message,
            stack: err.stack,
        });
    });
});

server.use('*', (req,res) => {
    res.status(404).json({
        message: 'not found'
    })
});

module.exports = server;

