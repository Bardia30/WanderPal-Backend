const axios = require('axios');


//hits unsplash api to retrieve the picture of the given city. 
//used when user enters a new destination. 
const getDestinationImage = (location) => {
    const locationName = location.replace(" ", "_");
    return axios.get(`https://api.unsplash.com/photos/random/?query=${locationName}&client_id=L1sCIFy5nsPIJWbZjjBOVHs1GZprKhdDKLAgMp59usE`)
        .then(res => {
            if (res.data && res.data.urls) {
                return res.data.urls.thumb;
            } else {
                throw new Error("Image URL not found in the response");
            }
        })
        .catch(err => console.error(err.message));
}


//test
// getDestinationImage("Toronto")
//     .then(res => console.log(res))
//     .catch(err => console.log(err));


module.exports = getDestinationImage;