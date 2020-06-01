
const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hcmNoZXRpYSIsImEiOiJja2F0Nzg0NmQwcXNmMnVvY3kyYjN6eHpvIn0.8dKKn6xM6r_94jeBX6NjjA&limit=1'

    request({ url: geocodeURL, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect service !', undefined)
        } else if( response.body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
