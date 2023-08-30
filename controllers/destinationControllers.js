const Destination = require('../models/destinationsModel');



const getUserDestinations = (req, res) => {
    const userId = req.params.uid;

    //logic for sending all the destinations for a user
    //got check if the user exists
    //then if so return all its destinations
    return res.send('users all destinations');
}


const addUserDestination = (req, res) => {
    //logic to post a new vacation destination plan for a user
    //has to validate if the user exists


    //figure out why there are errors.  
    //gotta create coordinates automatically from using api. By giving hotel name, can enter lat and lng
    const createdDestination = new Destination({
        destination, 
        arrival_date,
        departure_date, 
        creatorId, 
        hotel: {
            name, 
            location: coordinates
        },
        image
    })

    //async
    createdDestination.save();


}


const getUserDestinationById = (req, res) => {
    //logic to retrieve the selected specific detination, using dynamic url
}


const updateUserDestinationById = (req, res) => {
    //logic to retrieve the selected specific detination, using dynamic url, 
    //then update it using the users req.body
}

const deleteUserDestinationById = (req, res) => {
    //logic to retrieve the selected specific detination, using dynamic url
    //then delete the travel with all its schedules
}


exports.getUserDestinations = getUserDestinations;
exports.addUserDestination = addUserDestination;
exports.updateUserDestinationById = updateUserDestinationById;
exports.getUserDestinationById = getUserDestinationById;
exports.deleteUserDestinationById = deleteUserDestinationById;