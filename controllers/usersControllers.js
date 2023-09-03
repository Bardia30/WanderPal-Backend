const User = require('../models/usersModel');
const fileUpload = require('../middleware/file-upload');

const getUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json({ users: users })
        })
}


const getUserById = (req, res) => {
    const userId = req.params.uid;
    User.findOne({_id: userId})
        .then(user => {
            if (!user) {
                return res.status(404).send(`user with id: ${userId} was not found`);
            }
            res.status(200).json(user);
        })
}


// User signup function
const signup = (req, res) => {
    
    // Check if the email already exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'Email already exists!' });
            }

            const newUser = new User({
                email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    image: req.file.path
            });

            // Save the new user to the database
            return newUser.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User registered successfully!', userId: result._id });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(`Error occurred: ${err.message}`);
        });
}

// User login function
const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed! No such user found.' });
            }
            
            if (password !== user.password) {
                return res.status(401).json({ message: 'Authentication failed! Password is incorrect.' });
            }

            res.status(200).json({ message: 'Login successful!', userId: user._id });
        })
        .catch(err => {
            return res.status(500).send(`Error occurred: ${err.message}`);
        });
}


exports.login = login;
exports.signup = signup;
exports.getUsers = getUsers;
exports.getUserById = getUserById;