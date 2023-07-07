// API Keys
// No API Key required for OpenBrewery
const geoCodeAPIKey = "q7Ke99SInnm78MdEDZZSyUIVLvpQA2Eg";

let errorModal = $("#errorModal");
let missionModal = $('.mission')

/* this function is getting the users address and then passing it into
the geo api call*/
const getLatAndLong = () => {

  let userAddress = `${$("#user-house").val()} ${$("#user-street").val()}, ${$("#user-city").val()}`;

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
    prevAddress(userAddress)
    
    return lat, lon;
  })
}

/* This function takes the lat and lon from the geop api and passes it into the openBrewery api to get the 
closest pubs near the location user entered */
const findBrewery = (lat,lon) => {
  const openBreweryUrl = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}&per_page=6`;

  fetch(openBreweryUrl)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < 6; i++) {
        let pub = data[i];
        let pubName = pub.name;
        let pubStreet = pub.street;
        let pubCity = pub.city;
        let pubZip = pub.postal_code;
        let pubWebsite = pub.website_url;
        let pubPhone = pub.phone;

        const pubInfo = `
                      <div class="brewpubs brewpub-${i}">
                        <h4>${pubName}</h4>
                        <div class="location-info" id="location-info-${i}">
                          <p>${pubStreet}, ${pubCity}, ${pubZip}</p>
                          <a href='${pubWebsite}' target='_blank'>${pubWebsite}</a>
                          <p>${pubPhone}</p>
                        </div>
                      </div>
                      `;
        $(".accordion").append(pubInfo);
      }
      if ($(".brewpub-0")) {
        $(".brewpub-0").find(".location-info").slideDown();
        $(".brewpub-0 h4").addClass("box-open");
      }

      $(".brewpubs h4").click(function () {
        // If location block is already open, close it and remove the box-open class from the title element
        if ($(this).hasClass("box-open")) {
          $(this).parent().find(".location-info").slideUp();
          $(this).parent().find("h4").removeClass("box-open");
        } else {
          $(this).parent().find(".location-info").slideDown();
          $(this).parent().find("h4").addClass("box-open");
        }
      });
    });
}

const prevAddress = userAddress => {
  let history = getPrevAddress();
  let newHist = [];

  if(history){
      newHist = history.filter(item =>{
          return item !== userAddress
      })
  }
  // adding new lat and lon to the front of the array
  newHist.unshift(userAddress);

  if (newHist.length > 4) newHist.pop();
  
  localStorage.setItem('history', JSON.stringify(newHist));
}

// getting the history or array from local storage and returning it
const getPrevAddress = () => {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  
  return history
}

const returnPrevAddress = () => {
  const history = JSON.parse(localStorage.getItem('history'));

  $('#history-dropdown').html('');

    if(history){
      history.forEach((item) => {
          console.log(`history item: ${item}`);
            const html = ` <option id="search-history-${item}" value="${item}"></option>`;
            $('#history-dropdown').append(html);
        })
    }

    $('.select').on('click', function(e){
        getLatAndLong($(this).html());
    });
}

returnPrevAddress();

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
  $(".brewpubs").html("");
  $("#user-house").val('');
  $("#user-street").val('');
  $("#user-zip-code").val('');
  $("#user-city").val('');
  $('#states').val('AL');
});
