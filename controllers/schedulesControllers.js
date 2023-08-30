const Schedule = require('../models/schedulesModel');


const getAllSchedules = (req, res) => {
    //logic to return a user's all schedules by a specific vacation and a specific day
}


const addNewSchedule = (req, res) => {
    //logic to add a new sched for a vacation and a day
}


const getScheduleById = (req, res) => {
    //logic to get a specific schedule for a vacation and a day, by schedule ID 
}


const updateScheduleById = (req, res) => {
    //logic to update the schedule
}



const deleteScheduleById = (req, res) => {
    //logic to delete the schedule
}



exports.getAllSchedules = getAllSchedules;
exports.addNewSchedule = addNewSchedule;
exports.getScheduleById = getScheduleById;
exports.updateScheduleById = updateScheduleById;
exports.deleteScheduleById = deleteScheduleById;