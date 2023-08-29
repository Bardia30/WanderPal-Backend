const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const destinationsRoutes = require('./routes/destinationsRoutes');
const schedulesRoutes = require('./routes/schedulesRoutes');
const usersRoutes = require('./routes/usersRoutes');


const PORT = process.env.PORT || 8081;

app.use(cors());


app.use(express.json());


app.use(express.static('public'));




app.use('/:uid/destinations', destinationsRoutes);
app.use('/:uid/schedules', schedulesRoutes);








//port setting
app.listen(PORT, ()=> {
    console.log(`WanderPal server started on port ${PORT}`)
});