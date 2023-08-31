const axios = require('axios');

const getHotelLocation = (hotelName) => {
    return axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
            q: hotelName,
            format: 'json' 
        }
    })
    .then(res => {
        if (res.data.length > 0) {
            // const firstResult = res.data[0];
            // return firstResult;
            return {lat: res.data[0].lat, lng: res.data[0].lon};
        } else {
            throw new Error("Hotel not found")
        }
    })
    .catch(err => {
        console.error(`Error fetching hotel data: ${err}`);
    })
}



//test for caesars palace
// getHotelLocation("Caesars Palace")
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(`Error: ${error.message}`)
//     })
//returns { lat: '36.116627699999995', lng: '-115.17675675450909' }

module.exports = getHotelLocation;