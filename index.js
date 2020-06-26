
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const { json } = require('express');
require('dotenv').config()


const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

let database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    }); 
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data)
});

app.get('/weather/:latlng', async (request, response) => {
    //console.log(request.params)
    const latlng = request.params.latlng.split(',');
    //console.log(latlng);
    const lat = latlng[0];
    const lng = latlng[1];
    //console.log(lat, lng);


    const weather_api_key = process.env.CLIMACELL_API_KEY;
    const weather_url = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lng}&unit_system=us&fields%5B%5D=epa_health_concern&fields%5B%5D=temp&fields%5B%5D=weather_code&fields%5B%5D=pm25&apikey=${weather_api_key}`
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const location_api_key = process.env.LOCATIONIQ_API_KEY;
    const location_url = `https://us1.locationiq.com/v1/reverse.php?key=${location_api_key}&lat=${lat}&lon=${lng}&format=json`
    const location_response = await fetch(location_url);
    const location_data = await location_response.json();


    const data = {
        weather: weather_data,
        location: location_data
    };

    response.json(data);
});