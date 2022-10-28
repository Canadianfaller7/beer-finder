// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "887595172218881676268x71325";

function getLatAndLong() {
  let inputStreet = $("#user-street").text();
  let inputZip = $("#user-zip-code").text();
  let inputCity = $("#user-city").text();

  const geoQueryUrl = `https://geocode.xyz/${inputStreet},+${inputZip}+${inputCity}?json=1&auth=${geoCodeAPIKey}`;

  fetch(geoQueryUrl)
  .then(function (response) {
    return response.json();
  })
    
  .then(function (data) {
    let lat = data.latt ;
    let lon = data.longt;
    console.log(`lat => ${lat} || lon ${lon}`);
    $('.accordion').removeClass('hide')
    findBrewery(lat,lon);
    return lat,lon;
  });
}
/*function saveLatLon(lat, lon) {
  getLatAndLong();
  console.log(`lat => ${lat}`);
  localStorage.setItem('savedLat', JSON.stringify(lat));
  localStorage.setItem('savedLon',JSON.stringify(lon)); 
}
function getLocalLantLon() {
  var localLat = JSON.parse(localStorage.getItem("savedLat"));
  var localLon =  JSON.parse(localStorage.getItem("savedLat")); 

}*/

function findBrewery (lat,lon) {
  const openBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}&per_page=6`;

  fetch(openBreweryUrl)
  .then(function (response) {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    let pubOne = data[0];
    let pubTwo = data[1];
    let pubThree = data[2];
    let pubFour = data[3];
    let pubFive = data[4];
    let pubSix = data[5];

    $(".brewpub-1 h4").text(pubOne.name);
    $(".brewpub-2 h4").text(pubTwo.name);
    $(".brewpub-3 h4").text(pubThree.name);
    $(".brewpub-4 h4").text(pubFour.name);   
    $(".brewpub-5 h4").text(pubFive.name);
    $(".brewpub-6 h4").text(pubSix.name);

    const pubOneInfo = 
                      `
                      <p>${pubOne.street}, ${pubOne.city}, ${pubOne.postal_code}</p>
                      <p>${pubOne.website_url}</p>
                  
                      `;
    $('#location-info-1').append(pubOneInfo);
  
    const pubTwoInfo = 
                      `
                      <p>${pubTwo.street}, ${pubTwo.city}, ${pubTwo.postal_code}</p>
                      <p>${pubTwo.website_url}</p>
                      `;
    $('#location-info-2').append(pubTwoInfo);
  
    const pubThreeInfo = 
                      `
                      <p>${pubThree.street}, ${pubThree.city}, ${pubThree.postal_code}</p>
                      <p>${pubThree.website_url}</p>
                      `;
    $('#location-info-3').append(pubThreeInfo);

    const pubFourInfo = 
                      `
                      <p>${pubFour.street}, ${pubFour.city}, ${pubFour.postal_code}</p>
                      <p>${pubFour.website_url}</p>
                      `;
    $('#location-info-3').append(pubFourInfo);

    const pubFiveInfo = 
                      `
                      <p>${pubFive.street}, ${pubFive.city}, ${pubFive.postal_code}</p>
                      <p>${pubFive.website_url}</p>
                      `;
    $('#location-info-3').append(pubFiveInfo);

    const pubSixInfo = 
                      `
                      <p>${pubSix.street}, ${pubSix.city}, ${pubSix.postal_code}</p>
                      <p>${pubSix.website_url}</p>
                      `;
    $('#location-info-3').append(pubSixInfo);
  }) 
}

// event listener on .submit-button
$("#address-submit").on("click", (e) => {
        getLatAndLong()
});