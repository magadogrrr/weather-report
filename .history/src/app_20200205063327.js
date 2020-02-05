const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const headerData = {
    about_title: 'Our Mission',
    index_title: 'Home',
    help_title: 'Assistance'
}

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: headerData.index_title,
        headerData: headerData

    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: headerData.about_title,
        leader: 'Wiley E Coyote',
        headerData: headerData
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: headerData.help_title,
        tech: 'Foghorn Leghorn',
        imagepath: '/resources/img/foghorn.png',
        headerData: headerData
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address is required'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    }) => {
        if (error) {
            return res.send({
                error: error.toString()
            })
        } else if ((!latitude) || (!longitude)) {
            return res.send({
                error: ('no geolocations found for address: ' + req.query.address)
            })
        } else {
            forecast(latitude, longitude, (error, {
                forecast
            }) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    forecast,
                    location,
                    address: req.query.address
                })
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errormsg: 'Help topic not found',
        title: 'Helpless',
        headerData: headerData
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        errormsg: 'Page not found',
        title: '404',
        headerData: headerData
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port')
})