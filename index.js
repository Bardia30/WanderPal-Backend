const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

const destinationsRoutes = require('./routes/destinationsRoutes');
const schedulesRoutes = require('./routes/schedulesRoutes');
const usersRoutes = require('./routes/usersRoutes');


const PORT = process.env.PORT || 8081;




app.use(express.json());


app.use(express.static('public'));




app.use('/destinations', destinationsRoutes);
app.use('/schedules', schedulesRoutes);
app.use('/user', usersRoutes);




mongoose.connect("mongodb+srv://bardia30:19982007@wanderpal.2kklzap.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`WanderPal server started on port ${PORT}`)
        });
    })
    .catch((err) => console.log(err));


//port setting
