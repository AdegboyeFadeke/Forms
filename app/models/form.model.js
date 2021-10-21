const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    reasons: {
        type: String,
        required: true,
    },
}, {
    timeStamps: true
});

module.exports = mongoose.model('Form', FormSchema);