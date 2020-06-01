const request = require('request')

/**
 * get weather report based on lat & long
 */

 const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=53f45e8945ee595ccb6311a2f896f7cd&query=' + latitude + ',' + longitude + '&units=f'

    request({url: weatherUrl, json: true}, (error, response) => {
        //console.log(response.body)
        if(error) {
            callback('Unable to connect weather service !', undefined)
        } else if(response.body.error) {
            callback('unable to find location !', undefined)
        } else {
            callback(undefined, {
                descriptions: response.body.current.weather_descriptions[0], 
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
 }


 module.exports = forecast