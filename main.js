let map;
let inputIp = "";
fetchSwitch("");

function presentMap(data){
    if (inputIp){
        map.remove();
    }
    map = L.map('map-div', {
            center: [`${data.location.lat}`, `${data.location.lng}`],
            zoom: 13

        });
        console.log('3');
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
             maxZoom: 19,
             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         }).addTo(map);
}

// event listener for search line.
const form = document.getElementById('button-arrow');
form.addEventListener('click', function(e){
    e.preventDefault();
    inputIp = document.getElementById('input').value;
    console.log(inputIp);
    document.getElementById("ip-address").innerHTML = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("timezone").innerHTML = "";
    document.getElementById("isp").innerHTML = "";
    document.getElementById("map-div").innerHTML = "";
    

    fetchSwitch(inputIp);
   
})
async function fetchSwitch(inputIpStatus){
    let fetchType;
    if (inputIpStatus){
        fetchType = `https://geo.ipify.org/api/v2/country,city?apiKey=at_F47QKtOXqTITdhpywY4cTU1bUBb5a&ipAddress=${inputIp}`
        
    }
    else{
        fetchType = `https://geo.ipify.org/api/v2/country,city?apiKey=at_F47QKtOXqTITdhpywY4cTU1bUBb5a&ipAddress=2.2.2.2`

    }
    await fetch(fetchType)
    .then((response)=> {
        if(response.ok){
            return response.json()
        }
        else{
            throw new Error (response.statusText)
    }})
    .then((data)=>{
        presentInformationBox(data);
        presentMap(data);
        
        
})
}

let presentInformationBox = ((data) => {
    let ipAddress = document.getElementById('ip-address');
    let newIpAddress = document.createElement('div');
    newIpAddress.id = ('ip-address-info');
    newIpAddress.classList = ('square-info');
    newIpAddress.innerHTML = data.ip;
    ipAddress.appendChild(newIpAddress);
    let location = document.getElementById('location');
    let newLocation = document.createElement('div');
    newLocation.id = ('new-location');
    newLocation.classList = ('square-info');
    newLocation.innerHTML = data.location.region+", "+data.location.country;
    location.appendChild(newLocation);
    let timeZone = document.getElementById('timezone');
    let newTimeZone = document.createElement('div');
    newTimeZone.id = ('timezone');
    newTimeZone.classList = ('square-info');
    newTimeZone.innerHTML = data.location.timezone;
    timeZone.appendChild(newTimeZone);
    let isp = document.getElementById('isp');
    let newIsp = document.createElement('div');
    newIsp.id = ('isp');
    newIsp.classList = ('square-info');
    newIsp.innerHTML = data.isp;
    isp.appendChild(newIsp);
    })




































































































































