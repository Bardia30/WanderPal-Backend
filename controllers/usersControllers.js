const User = require('../models/usersModel');


// User signup function
const signup = (req, res) => {
    const { email, password, name, image } = req.body;

    // Check if the email already exists
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'Email already exists!' });
            }

            const newUser = new User({
                email,
                name,
                password,
                image
            });

            // Save the new user to the database
            return newUser.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User registered successfully!', userId: result._id });
        })
        .catch(err => {
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