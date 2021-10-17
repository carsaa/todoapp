const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
        id: {
            type: String,
            required: false
        },
        listId: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: false,
            default: false
        }
})

module.exports = mongoose.model('Todo', todoSchema)
