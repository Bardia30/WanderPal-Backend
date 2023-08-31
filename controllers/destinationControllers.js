const Destination = require('../models/destinationsModel');
const getHotelLocation = require('../util/getHotelLocation');


const getUserDestinations = (req, res) => {
    const userId = req.params.uid;

    //finding the destinations which have the creator Id same as the userId:
    Destination.find({creatorId: userId})
        .then(destinations => {
            if (!destinations || destinations.length === 0) {
                return res.status(404).send(`Could not find destinations for user with id: ${userId}`);
            }
            res.json({destinations: destinations.map(destination => destination.toObject({getters: true}))});
        })
        .catch(err => {
            return res.status(500).send(`Fetching destinations failed with error: ${err}`);
        })
}


const addUserDestination = (req, res) => {
    //logic to post a new vacation destination plan for a user
    //has to validate if the user exists
    const userHotel = req.body.hotelName;
    

    getHotelLocation(userHotel)
        .then(coordinates => {
            const createdDestination = new Destination({
                destination: req.body.destination, 
                arrival_date: new Date(req.body.arrival), //figure these out, from "yyyy-mm-dd" format to timestamp format
                departure_date: new Date(req.body.departure), 
                creatorId: req.params.uid, 
                hotel: {
                    name: userHotel, 
                    location: {
                        lat: Number(coordinates.lat),
                        lng: Number(coordinates.lng)
                    }
                },
                image: req.body.image //search net for a picture
            })
            
            
            return createdDestination.save();
        })
        .then(savedDestination => {
            res.status(201).json(savedDestination);
        })
        .catch((err) => {
            res.status(500).send(`An error occurred: ${err.message}`);
        })
    //figure out why there are errors.  
    //gotta create coordinates automatically from using api. By giving hotel name, can enter lat and lng
    


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