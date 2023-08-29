const express = require('express');
const router = express.Router();


const destinationControllers = require('../controllers/destinationControllers');


//get all user's destinations
router.get('/', destinationControllers.getUserDestinations);
//post a new vacation destination for a user
router.post('/', destinationControllers.addUserDestination);
//get a user's specific destination
router.get('/:destinationId', destinationControllers.getUserDestinationById);
//Update a user's destination 
router.put('/:destinationId', destinationControllers.updateUserDestinationById);
//Delete a user's destination
router.delete('/:destinationId', destinationControllers.deleteUserDestinationById);



module.exports = router;