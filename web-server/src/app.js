const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anand vyas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anand vyas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Anand vyas'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please mention a location before you search!!!'
        });
    }
    geoCode(req.query.address, (error, data) =>{
        if(error){
            return res.send({error:'something went wrong!'});
        }
        // console.log(error);
        // console.log(data);
        forecast(data.longitude,data.latitude, (error, forecastData=undefined)=>{
            if(error){
                return res.send({error:'location not found try different location'});
            }
            // console.log(error);
            // console.log(data);
            return res.send({
                forecast:'The temprature is '+forecastData.temperature+' and it feels like '+ forecastData.feelslike,
                address:req.query.address,
                // location
        });
        });
    });
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anand vyas',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anand vyas',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})
