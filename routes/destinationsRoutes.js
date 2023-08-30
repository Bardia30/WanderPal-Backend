const express = require('express');
const router = express.Router();


const destinationControllers = require('../controllers/destinationControllers');


//get all user's destinations
router.get('/:uid', destinationControllers.getUserDestinations);
//post a new vacation destination for a user
router.post('/:uid', destinationControllers.addUserDestination);
//get a user's specific destination
router.get('/:uid/:destinationId', destinationControllers.getUserDestinationById);
//Update a user's destination 
router.put('/:uid/:destinationId', destinationControllers.updateUserDestinationById);
//Delete a user's destination
router.delete('/:uid/:destinationId', destinationControllers.deleteUserDestinationById);



module.exports = router;