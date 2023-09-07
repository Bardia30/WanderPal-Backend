const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//figure out a way to relate destination and user IDs to this schema. 
const scheduleSchema = new Schema({
    creatorId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    destinationId: {type: mongoose.Types.ObjectId, required: true, ref: 'Destination'},
    day: {type: Number, required: true},
    name: {type: String, required: true},
    activity_type: {type: String, required: true},
    time: {type: Number, required: true},
    duration: {type: Number, required: true},
    website: {type: String, required: true}
})



module.exports = mongoose.model('Schedule', scheduleSchema);