// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "226313345002317562966x67994";
let geoQueryUrl = `https://geocode.xyz/${userStreetEl.value},+${userZipEl.value}+${userCityEl.value}?json=1&auth=${geoCodeAPIKey}`;

  

const openBrewery = `https://api.openbrewerydb.org/breweries?by_state=${statesInputEl}&per_page=3`;
let userStreetEl = document.getElementById("user-street");
let userZipEl = document.getElementById("user-zip-code")
let userCityEl = document.getElementbyId("user-city");
let statesInputEl = document.getElementById("states"); 

/* */
function getLatAndLong() {
    var cityLat;
    var cityLong;
    return [cityLat, cityLong]; 
 }

function getBrewPubs(lat, long) {
    
}



// event listener on .submit-button
let latLong = getLatAndLong(); // returns an a
getBrewPubs(cityLat, cityLong);

// event listener on .brewpubs to get .map-link click event
// 
