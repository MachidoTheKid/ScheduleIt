const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    module:{
        type: String,
        required: true
    },
    assignmentProgress:{
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

module.exports = mongoose.model('Assignment', AssignmentSchema )