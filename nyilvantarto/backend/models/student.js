const mongoose = require('mongoose');
const studentModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    hourfee: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('students', studentModel);