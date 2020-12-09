const mongoose = require('mongoose')

const MilestoneSchema = new mongoose.Schema({
    objective:{
        type: String,
        required: true
    },

    dueDate:{

        type: String,
        required: true

    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Milestone', MilestoneSchema )