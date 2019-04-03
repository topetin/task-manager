const express = require ('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    let user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {

    try {
        let users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    let _id = req.params.id

    try {
        let user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    let _id = req.params.id
    let updates = Object.keys(req.body)
    let allowedUpdates = ['name', 'email', 'password', 'age']
    let isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({'error': 'invalid updates'})
    }

    try {
        let user = await User.findById(_id)
        updates.forEach(update => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    let _id = req.params.id

    try {
        let user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router