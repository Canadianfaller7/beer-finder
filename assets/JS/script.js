// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "887595172218881676268x71325";

let errorModal = $("#errorModal");
let missionModal = $('.mission')

/* this function is getting the users address and then passing it into
the geo api call*/
const getLatAndLong = async () => {
  let inputStreet = $("#user-street").val();
  let inputZip = $("#user-zip-code").val();
  let inputCity = $("#user-city").val();

  const geoQueryUrl = `https://geocode.xyz/${inputStreet},+${inputZip}+${inputCity}?json=1&auth=${geoCodeAPIKey}`;

  // wait for result and make sure response is good, parse it
  await fetch(geoQueryUrl)
  .then(response => response.json())
  .then(data => {
    $('.accordion').addClass('hide')
    // getting lat and lon from api data to pass into brewery api
    let lat = data.latt ;
    let lon = data.longt;
    
    if (lat === "0.00000", lon === "0.00000") {
      errorModal.show();
      $(".close").on("click", (e) => {
        errorModal.hide();
      });
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = event => {
        if (event.target == errorModal) {
          errorModal.hide();
        }
      }
      return;
    };

    $('.accordion').removeClass('hide')
    
    findBrewery(lat,lon)
    savedLatLon(lat, lon)
    
    return lat, lon;
  })
}

/* This function takes the lat and lon from the geop api and passes it into the openBrewery api to get the 
closest pubs near the location user entered */
const findBrewery = async (lat,lon) => {
  const openBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}&per_page=6`;

  await fetch(openBreweryUrl)
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(data => {
    // setting var for 6 pub locations
    let pubOne = data[0];
    let pubTwo = data[1];
    let pubThree = data[2];
    let pubFour = data[3];
    let pubFive = data[4];
    let pubSix = data[5];
    
    // displaying names of pub for user
    $(".brewpub-1 h4").text(pubOne.name);
    $(".brewpub-2 h4").text(pubTwo.name);
    $(".brewpub-3 h4").text(pubThree.name);
    $(".brewpub-4 h4").text(pubFour.name);   
    $(".brewpub-5 h4").text(pubFive.name);
    $(".brewpub-6 h4").text(pubSix.name);

    // giving user the address and website of the pub
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
    $('#location-info-4').append(pubFourInfo);

    const pubFiveInfo = 
                      `
                      <p>${pubFive.street}, ${pubFive.city}, ${pubFive.postal_code}</p>
                      <p>${pubFive.website_url}</p>
                      `;
    $('#location-info-5').append(pubFiveInfo);

    const pubSixInfo = 
                      `
                      <p>${pubSix.street}, ${pubSix.city}, ${pubSix.postal_code}</p>
                      <p>${pubSix.website_url}</p>
                      `;
    $('#location-info-6').append(pubSixInfo);
  }) 
}

const savedLatLon = (lat, lon) => {
    let history = getSearchHistory();
    let newHist = [];

    if(history){
        newHist = history.filter(item =>{
            return item !== lat, lon
        })
    }
    // adding new lat and lon to the front of the array
    newHist.unshift(lat, lon);
    localStorage.setItem('history', JSON.stringify(newHist));
    

}

// getting the history or array from local storage and returning it
const getSearchHistory = () => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    returnHistory(history)
    return history
}

const returnHistory = async history => {
  //running the localStorage latn and long to receive associated pubs in order to populate page with search history.
    if (localStorage.getItem('history') != null) {
      const historyLat = history[0];
      const historyLong = history[1];
      const historyBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${historyLat},${historyLong}&per_page=4`;

      await fetch(historyBreweryUrl)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        let historyPubOne = data[0];
        let historyPubTwo = data[1];
        let historyPubThree = data[2];
        let historyPubFour = data[3];

        $("#search-history1").text(historyPubOne.name);
        $( "#search-history2").text(historyPubTwo.name);
        $("#search-history3").text(historyPubThree.name);
        $("#search-history4").text(historyPubFour.name); 
      })
    }
}

// hide and show mission statement
$('.mission').on('click', e => {
  $('#missionModal').show();
  $(".close").on("click", e => {
    $('#missionModal').hide();
  });
});

// event listener on .submit-button
$("#address-submit").on("click", e => {
  getLatAndLong()
  // resetting user values for new input
  $("#user-house").val('');
  $("#user-street").val('');
  $("#user-zip-code").val('');
  $("#user-city").val('');
  $('#states').val('AL');
  $('.location-info').html('');
});
