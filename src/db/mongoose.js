const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const me = new User({
    name: 'Mariana',
    email: 'alala'
})


me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})