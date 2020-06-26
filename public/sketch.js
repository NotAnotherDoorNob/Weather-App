
            
                let lat, lng, temp, unit, weatherCode, EPAcode, partMatter;
                if ("geolocation" in navigator) {
                    console.log('geolocation is available');
                    navigator.geolocation.getCurrentPosition(async position => {
                        lat = position.coords.latitude.toFixed(2);
                        lng = position.coords.longitude.toFixed(2);
                        //document.getElementById('lat').textContent = lat;
                        //document.getElementById('lon').textContent = lng;
                        


                        const api_url = `weather/${lat},${lng}`
                        const response = await fetch(api_url);
                        const json = await response.json();
                        console.log(json);
                        temp = json.weather.temp.value;
                        unit = json.weather.temp.units;
                        weatherCode = json.weather.weather_code.value;
                        EPAcode = json.weather.epa_health_concern.value;
                        partMatter = json.weather.pm25.value;


                        if (!json.location.address.city){
                            city = json.location.address.state;
                        } else {
                            city = json.location.address.city;
                        }
                        
                        //console.log(city === "undefined")


                        document.getElementById('temp').textContent = temp;
                        document.getElementById('unit').textContent = unit;
                        document.getElementById('weatherCode').textContent = weatherCode;
                        document.getElementById('EPAcode').textContent = EPAcode;
                        document.getElementById('partMatter').textContent = partMatter;
                        document.getElementById('city').textContent = city;
                    });
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


