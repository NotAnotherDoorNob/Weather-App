
            
            function setup() {

                noCanvas();
                const video = createCapture(VIDEO);
                video.size(320, 240);

                let lat, lng;
                const submitButton = document.getElementById('submit');
                submitButton.addEventListener('click', async event => {
                    const moodInput = document.getElementById("userMood").value;
                    video.loadPixels();
                    const image64 = video.canvas.toDataURL();
                    const data = { lat, lng, moodInput, image64 };
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

                if ("geolocation" in navigator) {
                    console.log('geolocation is available');
                    navigator.geolocation.getCurrentPosition(async position => {
                        lat = position.coords.latitude.toFixed(2);
                        lng = position.coords.longitude.toFixed(2);
                        document.getElementById('lat').textContent = lat;
                        document.getElementById('lon').textContent = lng;

                    });
                } else {
                    console.log('geolocation IS NOT available');
                };

                
            };

