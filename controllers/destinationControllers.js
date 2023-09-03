const Destination = require('../models/destinationsModel');
const Schedule = require('../models/schedulesModel');
const getHotelLocation = require('../util/getHotelLocation');
const getDestinationImage = require('../util/getDestinationImage');

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
    let createdDestination;

    getHotelLocation(userHotel)
        .then(coordinates => {
            createdDestination = new Destination({
                destination: req.body.destination, 
                arrival_date: req.body.arrival_date, //figure these out, from "yyyy-mm-dd" format to timestamp format
                departure_date: req.body.departure_date, 
                creatorId: req.params.uid, 
                hotel: {
                    name: userHotel, 
                    location: {
                        lat: Number(coordinates.lat),
                        lng: Number(coordinates.lng)
                    }
                },
            });
            
            
            return getDestinationImage(req.body.destination);
        })
        .then(imageUrl => {
            createdDestination.image = imageUrl;
            return createdDestination.save();
        })
        .then(savedDestination => {
            res.status(201).json(savedDestination);
        })
        .catch((err) => {
            res.status(500).send(`An error occurred: ${err.message}`);
        })
}


const getUserDestinationById = (req, res) => {
    const userId = req.params.uid;
    const destinationId = req.params.destinationId;
    
    Destination.findOne({ _id: destinationId, creatorId: userId })
        .then(destination => {
            if (!destination) {
                return res.status(404).send(`Could not find destination with id: ${destinationId} for user with id: ${userId}`);
            }
            return res.status(200).json(destination);
        })
        .catch(err => {
            return res.status(500).send(`Fetching destination failed with error: ${err}`);
        });
}


const updateUserDestinationById = (req, res) => {
    //logic to retrieve the selected specific detination, using dynamic url, 
    //then update it using the users req.body

    const { destinationId, userId } = req.params;
    const updatedData = req.body;

    // Check for valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(destinationId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid IDs');
    }

    // Validate inputs
    const validFields = ['destination', 'arrival_date', 'departure_date', 'creatorId', 'hotel'];
    const dataKeys = Object.keys(updatedData);
    for (let i = 0; i < dataKeys.length; i++) {
        if (!validFields.includes(dataKeys[i])) {
            return res.status(400).send(`Invalid field: ${dataKeys[i]}`);
        }
    }

    // Check for hotel structure if provided
    if (updatedData.hotel) {
        const validHotelFields = ['name'];
        const hotelKeys = Object.keys(updatedData.hotel);
        for (let i = 0; i < hotelKeys.length; i++) {
            if (!validHotelFields.includes(hotelKeys[i])) {
                return res.status(400).send(`Invalid field in hotel: ${hotelKeys[i]}`);
            }
        }
    }

    // Get destination image and hotel location
    getDestinationImage(updatedData.destination)
    .then(imageUrl => {
        updatedData.image = imageUrl;

        if (updatedData.hotel && updatedData.hotel.name) {
            return getHotelLocation(updatedData.hotel.name);
        } else {
            return null;
        }
    })
    .then(hotelLocation => {
        if (hotelLocation) {
            updatedData.hotel.location = hotelLocation;
        }

        return Destination.findOneAndUpdate(
            { _id: destinationId, creatorId: userId },
            updatedData,
            { new: true, runValidators: true }
        );
    })
    .then(updatedDestination => {
        if (!updatedDestination) {
            return res.status(404).send(`Could not find destination with id: ${destinationId} for user with id: ${userId}`);
        }
        return res.status(200).json(updatedDestination);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
        
}

const deleteUserDestinationById = (req, res) => {
    //logic to retrieve the selected specific detination, using dynamic url
    //then delete the travel with all its schedules
    const { destinationId, userId } = req.params;

    // Check for valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(destinationId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid IDs');
    }

    // Begin by deleting the destination
    Destination.findOneAndDelete({ _id: destinationId, creatorId: userId })
    .then(result => {
        if (!result) {
            return res.status(404).send(`Could not find destination with id: ${destinationId} for user with id: ${userId}`);
        }

        // If destination is deleted successfully, proceed to delete related schedules
        return Schedule.deleteMany({ destinationId: destinationId });
    })
    .then(() => {
        return res.status(200).send(`Destination with id: ${destinationId} and all related schedules have been deleted successfully.`);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
}


exports.getUserDestinations = getUserDestinations;
exports.addUserDestination = addUserDestination;
exports.updateUserDestinationById = updateUserDestinationById;
exports.getUserDestinationById = getUserDestinationById;
exports.deleteUserDestinationById = deleteUserDestinationById;