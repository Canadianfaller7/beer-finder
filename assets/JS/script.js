// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "226313345002317562966x67994";

//var apiUrl = `https://geocode.xyz/Hauptstr.,+57632+Berzhausen?json=1&auth=${geoCodeAPIKey}`;
//console.log(apiUrl);

//const openBrewery = `https://api.openbrewerydb.org/breweries?by_state=${statesInputEl}&per_page=3`;
/*let let inputStreet = document.getElementById("user-street");
let inputZip = document.getElementById("user-zip-code")
let userCityEl = document.getElementById("user-city");
let statesInputEl = document.getElementById("states"); */
//let geoQueryUrl = `https://geocode.xyz/${userStreetEl.value},+${userZipEl.value}+${userCityEl.value}?json=1&auth=${geoCodeAPIKey}`;


function getLatAndLong() {
    inputStreet = $("#user-street").val();
    inputZip = $("#user-zip-code").val();
    inputCity = $("#user-city").val();

    
    
    let geoQueryUrl = `https://geocode.xyz/${inputStreet},+${inputZip}+${inputCity}?json=1&auth=${geoCodeAPIKey}`;

    
    fetch(geoQueryUrl)
    .then(function (response) {
        return response.json();
      })
     
      .then(function (data) {
        //if (!data) {
          //alert("Location not found");
        //}else{
            //getBrewPubs()
            var lat = data.latt ;
            var lon = data.longt;
            console.log(data);
            console.log(inputStreet);
            console.log(lat);
            console.log(lon);
            
              function findBrewery () {
              var openBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}`;
        
              fetch(openBreweryUrl)
              .then(function (response) {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
              })
                .then(function (data) {
                  console.log(data);
                })
        
                
            }
            findBrewery();
          
     
        });

    };


  
//}
// return [lat, lon]; 
;


function getAddress() {
    inputStreet = $("#user-street").val();
    inputZip = $("#user-zip-code").val();
    inputCity = $("#user-city").val();

    console.log(inputZip);
  }

 

/*function getBrewPubs(lat, long) {
    
} */



// event listener on .submit-button
$("#address-submit").on("click", (e) => {
        getAddress()
        getLatAndLong()
      
    }
    
    
  );


//let latLong = getLatAndLong(); 
// returns an a
//getBrewPubs(cityLat, cityLong);

// event listener on .brewpubs to get .map-link click event

