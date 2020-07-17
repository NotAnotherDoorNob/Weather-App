




                function insertImage(weatherVar){
                    var x = document.createElement("img");
                    x.setAttribute("src", "Images/" + weatherVar + ".svg");
                    x.setAttribute("width", "150");
                    var src = document.getElementById("weatherImage")
                    src.appendChild(x);
                }

                function pollenConversion(pollenRating) {
                    switch (pollenRating) {
                        case null: return "Not in season";
                        case 0: return "Minimal to None";
                        case 1: return "Low";
                        case 2: return "Low to Medium";
                        case 3: return "Medium";
                        case 4: return "Medium to High";
                        case 5: return "High";
                        default: console.log("error")
                    }
                }

                

                document.getElementById('city').textContent = `Loading...`;
                let lat, lng, temp, unit, weatherCode, EPAcode, partMatter, cloudCoverage, rawWeatherCode, windSpeed, pollenWeed, pollenGrass;
                if ("geolocation" in navigator) {
                    console.log('geolocation is available');
                    navigator.geolocation.getCurrentPosition(async position => {
                        lat = position.coords.latitude.toFixed(2);
                        lng = position.coords.longitude.toFixed(2);
                        //document.getElementById('lat').textContent = lat;
                        //document.getElementById('lon').textContent = lng;
                        

                        //getting weather and location
                        const api_url = `weather/${lat},${lng}`
                        const response = await fetch(api_url);
                        const json = await response.json();
                        console.log(json);
                        temp = json.weather.temp.value;
                        temp = temp.toFixed(1);
                        feels_like = json.weather.feels_like.value;
                        feels_like = feels_like.toFixed(1);
                        unit = json.weather.temp.units;
                        weatherCode = json.weather.weather_code.value;
                        rawWeatherCode = json.weather.weather_code.value;
                        cloudCoverage = json.weather.cloud_cover.value;
                        EPAcode = json.weather.epa_health_concern.value;
                        partMatter = json.weather.pm25.value;
                        partMatter = partMatter.toFixed(1);
                        windSpeed = json.weather.wind_speed.value;
                        windSpeed = windSpeed.toFixed(1);
                        humidity = json.weather.humidity.value;
                        humidity = humidity.toFixed(1);
                        pollenWeed = json.weather.pollen_weed.value;
                        pollenGrass = json.weather.pollen_grass.value;
                        pollenTree = json.weather.pollen_tree.value;
 
                        let convPollenWeed = pollenConversion(pollenWeed);
                        let convPollenGrass = pollenConversion(pollenGrass);
                        let convPollenTree = pollenConversion(pollenTree);


                        console.log(partMatter);
                        //taking out the underscore in weatherCode
                        if (weatherCode.includes("_")){
                            weatherCode = weatherCode.replace("_", " ")
                        }


                        //gabbing city or state
                        if (!json.location.address.city){
                            city = json.location.address.state;
                        } else {
                            city = json.location.address.city;
                        }


                        //dom manipulation
                        document.getElementById('temp').textContent = temp;
                        document.getElementById('feels_like').textContent = `Feels like ${feels_like}°${unit}`;
                        document.getElementById('unit').textContent = `°${unit}`;
                        document.getElementById('weatherCode').textContent = weatherCode;
                        document.getElementById('EPAcode').textContent = EPAcode;
                        document.getElementById('partMatter').textContent = partMatter;
                        document.getElementById('city').textContent = city;
                        document.getElementById('cloudCoverage').textContent = `${cloudCoverage}%`;
                        document.getElementById('windSpeed').textContent = `${windSpeed} mph`;
                        document.getElementById('humidity').textContent = `${humidity}%`
                        document.getElementById('pollenWeed').textContent = `${convPollenWeed}`
                        document.getElementById('pollenGrass').textContent = `${convPollenGrass}`
                        document.getElementById('pollenTree').textContent = `${convPollenTree}`
                        

                        switch(rawWeatherCode) {
                            case "clear":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "mostly_clear":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "partly_cloudy":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "mostly_cloudy":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "cloudy":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "fog":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "fog_light":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "drizzle":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "rain_light":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "rain":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "rain_heavy":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "tstorm":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "flurries":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "snow_light":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "snow":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "snow_heavy":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "ice_pellets_light":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "ice_pellets":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            case "ice_pellets_heavy":
                                console.log(rawWeatherCode);
                                insertImage(rawWeatherCode);
                                break;
                            default:
                                 console.log(rawWeatherCode);
                        }
                    });
                    


                    let xAxisLength = 280;
                    let graphWords = ["Good", "Moderate", "Hazardous", "Current"];
                    let graphHeight = [];
                    



                    function setup() {
                        var canvas = createCanvas(300, 200);
                        canvas.parent('sketch-holder');
                        
                    }
                    
                    
                    
                    
                    function draw() {

                        translate(0, 180)
                    
                        let particleLevel = [0, 12, 35.4, partMatter];
                        let blue = color(91, 196, 245);
                        let gray = color(200);
                        let lightGray = color(225);
                    
                        push();
                            for (var i=0; i <= 15; i++){
                                stroke(lightGray);
                                line(20, 0, xAxisLength, 0);
                                translate(0, -20);
                    
                                if(i===2|| i===4 || i===6 || i===8) {
                                    textSize(9);
                                    fill(175);
                                    text(i * 5 , 10, 23);
                                }
                    
                            }
                        pop();
                    
                        push();
                            translate(55, 0)
                            for(var i=0; i <= 3; i++)  {
                    
                    
                            //mapping height to the graph height!!!
                            graphHeight[i] = round(map(particleLevel[i], 0, 35, 0, 140));
                            
                            if (i <= 2){
                                //bars
                                fill(gray);
                                noStroke();
                                ellipse(0, -graphHeight[i], 5, );
                                translate(65, 0);
                    
                                //x axis numbers
                                textSize(11);
                                textAlign(CENTER);
                                text(graphWords[i], -66, 20);
                    
                            } else {
                    
                                //bars
                                fill(blue);
                                noStroke();
                                ellipse(0, -graphHeight[i], 5, );
                                translate(60, 0);
                    
                                //x axis numbers
                                textSize(13);
                                
                                textAlign(CENTER);
                                text(graphWords[i], -66, 20);
                            }
                            
                    
                    
                            }
                        pop();
                    }
                    
                            
                            
                            
                } else {
                    console.log('geolocation IS NOT available');
                };



                

                


  




                const submitButton = document.getElementById('checkIn');
                submitButton.addEventListener('click', async event => {
                    const data = { lat, lng, temp, unit, weatherCode };
                        const options = {
                            method:'POST', 
                            headers: {
                                'Content-Type': 'application/json'
                                },
                            body: JSON.stringify(data)
                        };
                        const response = await fetch('/api', options)
                        const json = await response.json();
                        console.log(json);
                });


