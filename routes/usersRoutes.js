const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers');


//get all users.

//signup logic
router.post('/signup', usersControllers.signup)

//login logic
router.post('/login/', usersControllers.login);




module.exports = router;