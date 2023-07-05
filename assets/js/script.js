// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "q7Ke99SInnm78MdEDZZSyUIVLvpQA2Eg";

let errorModal = $("#errorModal");
let missionModal = $('.mission')

/* this function is getting the users address and then passing it into
the geo api call*/
const getLatAndLong = () => {
  let inputHouse = $("#user-house").val();
  let inputStreet = $("#user-street").val();
  let inputZip = $("#user-zip-code").val();
  let inputCity = $("#user-city").val();

  let userAddress = `${inputHouse} ${inputStreet}, ${inputCity} `

  const geoQueryUrl = `https://api.tomtom.com/search/2/geocode/${userAddress}.json?key=${geoCodeAPIKey}`;
  
  // wait for result and make sure response is good, parse it
  fetch(geoQueryUrl)
  .then(response => response.json())
  .then(data => {
    $('.accordion').addClass('hide')
    // getting lat and lon from api data to pass into brewery api
    let lat = data.results[0].position.lat;
    let lon = data.results[0].position.lon;
    
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
const findBrewery = (lat,lon) => {
  const openBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}&per_page=6`;

  fetch(openBreweryUrl)
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
                      <a href='${pubOne.website_url}' target='_blank'>${pubOne.website_url}</a>
                  
                      `;
    $('#location-info-1').append(pubOneInfo);
  
    const pubTwoInfo = 
                      `
                      <p>${pubTwo.street}, ${pubTwo.city}, ${pubTwo.postal_code}</p>
                      <a href='${pubTwo.website_url}' target='_blank'>${pubTwo.website_url}</a>
                      `;
    $('#location-info-2').append(pubTwoInfo);
  
    const pubThreeInfo = 
                      `
                      <p>${pubThree.street}, ${pubThree.city}, ${pubThree.postal_code}</p>
                      <a href='${pubThree.website_url}' target='_blank'>${pubThree.website_url}</a>
                      `;
    $('#location-info-3').append(pubThreeInfo);

    const pubFourInfo = 
                      `
                      <p>${pubFour.street}, ${pubFour.city}, ${pubFour.postal_code}</p>
                      <a href='${pubFour.website_url}' target='_blank'>${pubFour.website_url}</a>
                      `;
    $('#location-info-4').append(pubFourInfo);

    const pubFiveInfo = 
                      `
                      <p>${pubFive.street}, ${pubFive.city}, ${pubFive.postal_code}</p>
                      <a href='${pubFive.website_url}' target='_blank'>${pubFive.website_url}</a>
                      `;
    $('#location-info-5').append(pubFiveInfo);

    const pubSixInfo = 
                      `
                      <p>${pubSix.street}, ${pubSix.city}, ${pubSix.postal_code}</p>
                      <a href='${pubSix.website_url}' target='_blank'>${pubSix.website_url}</a>
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

const returnHistory = history => {
  //running the localStorage latn and long to receive associated pubs in order to populate page with search history.
    if (localStorage.getItem('history') != null) {
      const historyLat = history[0];
      const historyLong = history[1];
      const historyBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${historyLat},${historyLong}&per_page=4`;

      fetch(historyBreweryUrl)
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
