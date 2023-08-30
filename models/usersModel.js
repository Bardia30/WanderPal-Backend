const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


//figure out a way to make the password more secure. hashing it. 
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    password: {type: String, required: true, minlength: 8},
    image: {type: String, required: true},
})

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);