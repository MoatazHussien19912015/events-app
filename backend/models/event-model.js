const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    closed: {type: Boolean, required: true},
    submittedAt: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});




const model =  mongoose.model('Event', EventSchema);


module.exports = model;