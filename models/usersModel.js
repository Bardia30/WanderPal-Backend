const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//figure out a way to make the password more secure. hashing it. 
const userSchema = new Schema({
    user_name: {type: String, required: true},
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    password: {type: String, required: true},
    image: {type: String, required: true} 
})