const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'low',
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
        },
        category: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    }, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)

