const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//a schema for the destination document
//note: image is a url pointing to a backend
//note: lat and lng will be automatically created
//destinationId will be created automatically
//creatorId is from usersSchema 
const destinationSchema = new Schema({
    destination: {type: String, required: true},
    arrival_date: {type: Date, required: true},
    departure_date: {type: Date, required: true},
    creatorId: {type: String, required: true},
    hotel: {
        name: {type: String, required: true},
        location: {
            lat: {type: Number, required: true},
            lng: {type: Number, required: true}
        }
    },
    image: {type: String, required: true}
})

//collection name: places
module.exports = mongoose.model('Destination', destinationSchema);