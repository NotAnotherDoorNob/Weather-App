const mymap = L.map('checkinMap').setView([0, 0], 2);
const attribution = 
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: attribution
});
tiles.addTo(mymap);


getData();
            async function getData()    {
                const response = await fetch('/api');
                const data = await response.json()
                

                for (item of data) {
                    const marker = L.marker([item.lat, item.lng]).addTo(mymap);

                    let d = new Date(item.timestamp)
                    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true, dayPeriod: true});
                    const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },, {value: dayPeriod}] = dateTimeFormat .formatToParts(d);

                    const txt = `The weather here at ${item.lat}, ${item.lng} on ${month}-${day}-${year} ${hour}:${minute} ${dayPeriod} was ${item.weatherCode}, ${item.temp}°F`
                    marker.bindPopup(txt);
                    //console.log(txt);

                }
 
                console.log(data);
            }