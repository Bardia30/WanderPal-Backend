const express = require('express');
const router = express.Router();
const checkAuth =require('../middleware/check-auth');

const schedulesControllers = require('../controllers/schedulesControllers');

router.use(checkAuth);

//get all the schedules for a vacation, on a specific day
router.get('/:uid/:destinationId/', schedulesControllers.getAllSchedules);

//post a new schedule, on a specific day, for a specific vacation
router.post('/:uid/:destinationId/:day', schedulesControllers.addNewSchedule)

//get a specific schedule by vacation and day, and schedule id
router.get('/:uid/:destinationId/:day/:scheduleId', schedulesControllers.getScheduleById);


//update a specific schedule
router.put('/:uid/:destinationId/:day/:scheduleId', schedulesControllers.updateScheduleById);


//delete a specific schedule
router.delete('/:uid/:destinationId/:scheduleId', schedulesControllers.deleteScheduleById);




module.exports=router;