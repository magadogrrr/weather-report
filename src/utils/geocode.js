const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidG9ycmVuem8iLCJhIjoiY2s2N3dyeXRuMjE3aTNrcW9iOXd2MHYyaSJ9.r3uBma7bTXJK2WJYHlcaVg'

    request({url, json: true}, (error, { body }) => {
    try {
            if (error) {
                callback('unable to complete request to weather service.' + error, undefined)
            } else if (body.error) {
                callback('error returned' + response.body.error, undefined)
            } else if (body.features.length === 0){
                callback('No results for location', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            //  console.log(response.body)
            }
        } catch (err) {
            console.error(err)
            callback('exception in geocode request: ' + err, undefined)
        }
    })
}


module.exports = geocode