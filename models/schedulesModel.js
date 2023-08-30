const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//figure out a way to relate destination and user IDs to this schema. 
const scheduleSchema = new Schema({
    creatorId: {type: String, required: true},
    destinationId: {type: String, required: true},
    day: {type: Number, required: true},
    name: {type: String, required: true},
    activity_type: {type: String, required: true},
    time: {type: Date, required: true},
    duration: {type: Number, required: true},
    website: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    }

})



module.exports = mongoose.model('Schedule', scheduleSchema);