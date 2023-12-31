const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');



//get a user by Id
router.get('/:uid', usersControllers.getUserById);

//signup logic
router.post('/signup', fileUpload.single('image'), usersControllers.signup)

//login logic
router.post('/login', usersControllers.login);

router.use(checkAuth);

//get all users.
router.get('/getUsers', usersControllers.getUsers);


module.exports = router;