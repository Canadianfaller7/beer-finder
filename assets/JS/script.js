// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "226313345002317562966x67994";

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

            var lat = data.latt ;
            var lon = data.longt;
        
            findBrewery(lat,lon);
          
            return lat,lon;
     
        });

    };

    function findBrewery (lat,lon) {
      var openBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}`;

      fetch(openBreweryUrl)
      .then(function (response) {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
        .then(function (data) {
          console.log(data);
          console.log(data[0].name)

            var pubNameOne = data[0].name;
            var pubNameTwo = data[1].name;
            var pubNameThree = data[2].name;

            $(".brewpub-1 h4").text(pubNameOne);
            $(".brewpub-2 h4").text(pubNameTwo);
            $(".brewpub-3 h4").text(pubNameThree);    
        })   
    };
  

// event listener on .submit-button
$("#address-submit").on("click", (e) => {
        getLatAndLong()     
    }  
  );




