const User = require('../models/usersModel');
const fileUpload = require('../middleware/file-upload');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json({ users: users })
        })
}


const getUserById = (req, res) => {
    const userId = req.params.uid;
    User.findOne({ _id: userId })
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

            return bcrypt.hash(req.body.password, 12);
        })
        .then(hashedPassword => {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                image: req.file.path
            });

            // Save the new user to the database
            return newUser.save();
        })
        .then(createdUser => {
            const token = jwt.sign(
                { userId: createdUser._id, email: createdUser.email },
                'secretKey',
                { expiresIn: '1h' }
            );

            res.status(201).json({ 
                message: 'User registered successfully!', 
                userId: createdUser._id,
                token: token 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(`Error occurred: ${err.message}`);
        });
};


// User login function
const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed! No such user found.' });
            }

            return bcrypt.compare(password, user.password)
                .then(isValidPassword => {
                    if (!isValidPassword) {
                        return res.status(401).json({ message: 'Authentication failed! Password is incorrect.' });
                    }

                    const token = jwt.sign(
                        { userId: user._id, email: user.email },
                        'secretKey',
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({ message: 'Login successful!', userId: user._id, token: token });
                })
                .catch(err => {
                    return res.status(500).send(`Could not log you in, try again!`);
                });
        })
        .catch(err => {
            return res.status(500).send(`Error occurred: ${err.message}`);
        });
};


exports.login = login;
exports.signup = signup;
exports.getUsers = getUsers;
exports.getUserById = getUserById;