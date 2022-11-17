const request = require('postman-request');
const geoCode = (address, callback) => {
    const mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRtaW4tMDk4IiwiYSI6ImNsYWpidG5oZTBiY2wzb3MyajByNjU1ZngifQ.iI2l2y2prRlpI8dDNL4a9w&limit=1';
    request({ url: mapbox, json: true }, (error, response) => {
        if (error) {
            callback('unable to get the location', undefined);
        } else if (response.body.features.length === 0) {
            callback('unable to get the location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1]
            });
        }
    });
}

module.exports = geoCode;