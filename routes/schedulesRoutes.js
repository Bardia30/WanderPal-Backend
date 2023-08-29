const express = require('express');
const router = express.Router();

const schedulesControllers = require('../controllers/schedulesControllers');


//get all the schedules for a vacation, on a specific day
router.get('/:vacationId/:day', schedulesControllers.getAllSchedules);

//post a new schedule, on a specific day, for a specific vacation
router.post('/:vacationId/:day', schedulesControllers.addNewSchedule)

//get a specific schedule by vacation and day, and schedule id
router.get('/:vacation/:day/:scheduleId', schedulesControllers.getScheduleById);


//update a specific schedule
router.put('/:vacationId/:day/:scheduleId', schedulesControllers.updateScheduleById);


//delete a specific schedule
router.delete('/:vacationId/:day/:scheduleId', schedulesControllers.deleteScheduleById);




module.exports=router;