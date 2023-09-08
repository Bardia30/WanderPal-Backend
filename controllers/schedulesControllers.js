const mongoose = require('mongoose');
const Schedule = require('../models/schedulesModel');
const fileUpload = require('../middleware/file-upload');

const getAllSchedules = (req, res) => {
    //logic to return a user's all schedules by a specific vacation and a specific day
    const { uid, destinationId} = req.params;

    // Check for valid ObjectIds and valid day
    if (!mongoose.Types.ObjectId.isValid(destinationId) || !mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).send('Invalid IDs or day');
    }

    Schedule.find({ creatorId: uid, destinationId: destinationId })
    .then(schedules => {
        if (schedules.length === 0) {
            return res.status(404).send(`No schedules found for user with id: ${uid}, destinationId: ${destinationId}`);
        }
        return res.status(200).json(schedules);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
}


const addNewSchedule = (req, res) => {
    //logic to add a new sched for a vacation and a day
    const { uid, destinationId, day } = req.params;

    // Check for valid ObjectIds and valid day
    if (!mongoose.Types.ObjectId.isValid(destinationId) || !mongoose.Types.ObjectId.isValid(uid) || isNaN(day)) {
        return res.status(400).send('Invalid IDs or day');
    }

    // Extract other schedule details from the request body
    const { name, activity_type, time, duration, website } = req.body;

    // Validate extracted details (You can expand upon this, this is a basic check)
    if (!name || !activity_type || !time || !duration || !website ) {
        return res.status(400).send('Incomplete schedule details');
    }

    // Create a new Schedule document
    const newSchedule = new Schedule({
        creatorId: uid,
        destinationId: destinationId,
        day: day,
        name: name,
        activity_type: activity_type,
        time: time, 
        duration: duration,
        website: website
    });

    // Save the new Schedule document to the database
    newSchedule.save()
    .then(savedSchedule => {
        return res.status(201).json(savedSchedule);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
}


const getScheduleById = (req, res) => {
    //logic to get a specific schedule for a vacation and a day, by schedule ID 
    const { scheduleId } = req.params;

    // Check for a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return res.status(400).send('Invalid Schedule ID');
    }

    // Query the database for the schedule with the provided ID
    Schedule.findById(scheduleId)
    .then(schedule => {
        if (!schedule) {
            return res.status(404).send(`No schedule found with id: ${scheduleId}`);
        }
        return res.status(200).json(schedule);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
}


const updateScheduleById = (req, res) => {
    //logic to update the schedule
    const { scheduleId } = req.params; // Extract scheduleId from params to know which schedule to update

    // Check for a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return res.status(400).send('Invalid Schedule ID');
    }

    // Extract other schedule details from the request body
    const { creatorId, destinationId, day, name, activity_type, time, duration, website } = req.body;

    // Validate extracted details (You can expand upon this, this is a basic check)
    if (!creatorId || !destinationId || !day || !name || !activity_type || !time || !duration || !website) {
        return res.status(400).send('Incomplete schedule details');
    }

    // Check for valid ObjectIds and valid day
    if (!mongoose.Types.ObjectId.isValid(destinationId) || !mongoose.Types.ObjectId.isValid(creatorId) || isNaN(day)) {
        return res.status(400).send('Invalid IDs or day');
    }

    // Data to update
    const updatedData = {
        creatorId: creatorId,
        destinationId: destinationId,
        day: day,
        name: name,
        activity_type: activity_type,
        time: new Date(time),
        duration: duration,
        website: website
        
    };

    // Update the schedule in the database using findByIdAndUpdate
    Schedule.findByIdAndUpdate(scheduleId, updatedData, { new: true }) // { new: true } returns the updated document
    .then(updatedSchedule => {
        if (!updatedSchedule) {
            return res.status(404).send(`No schedule found with id: ${scheduleId}`);
        }
        return res.status(200).json(updatedSchedule);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
}



const deleteScheduleById = (req, res) => {
    //logic to delete the schedule
    const { scheduleId } = req.params;

    // Check for a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return res.status(400).send('Invalid Schedule ID');
    }

    // Delete the schedule using findByIdAndRemove
    Schedule.findByIdAndRemove(scheduleId)
    .then(deletedSchedule => {
        if (!deletedSchedule) {
            return res.status(404).send(`No schedule found with id: ${scheduleId}`);
        }
        return res.status(200).send(`Schedule with id: ${scheduleId} was successfully deleted`);
    })
    .catch(err => {
        return res.status(500).send(`Error occurred: ${err.message}`);
    });
}



exports.getAllSchedules = getAllSchedules;
exports.addNewSchedule = addNewSchedule;
exports.getScheduleById = getScheduleById;
exports.updateScheduleById = updateScheduleById;
exports.deleteScheduleById = deleteScheduleById;