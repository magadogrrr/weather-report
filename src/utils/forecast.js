const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e5fbef63d77578b399536cc55a5297c2/' + encodeURIComponent(latitude + ',' + longitude)


    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('unable to complete request to weather service.', undefined)
        } else {
            callback(undefined, {
                forecast: body.currently.summary
            })
        }
    })
}



module.exports = forecast