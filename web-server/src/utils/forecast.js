const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2aebf2a05e2ed8882f36643d8a73ce1c&query='+latitude+','+longitude;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to get weather information', undefined);
        } else if (response.body.error) {
            callback('unable to get weather information', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            });
        }
    });

}

module.exports = forecast;
