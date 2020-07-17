
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const { json } = require('express');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
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
    const weather_url = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lng}&unit_system=us&fields=pollen_tree%2Cpollen_weed%2Cpollen_grass%2Ctemp%2Cweather_code%2Cfeels_like%2Chumidity%2Cwind_speed%2Cpm25%2Ccloud_cover%2Cepa_health_concern&apikey=${weather_api_key}`
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