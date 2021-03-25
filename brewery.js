// Loading in our API keys
const WEATHER_KEY = config.WEATHER_API_KEY
const UN_KEY = config.UNSPLASH_KEY

// Selecting our variable elements
let submit = document.getElementById('submit-btn')
let perPage = document.getElementById('per-page')
let botContainer = document.getElementById('card-container')

// function to generate the card information
const generateCard = (data) => {

    // Error handler for no results returned
    if (data.length === 0) {
        let searchText = document.getElementById('search-text')
        searchText.innerHTML = 'No results. Check your search inputs and try again!'
    }

    for (let i = 0, len = data.length; i < len; i++) {

        // Generating HTML that will go in card and card container
        let link = document.createElement('a')
        link.href = `${data[i].website_url}`
        // Sets link target to _blank so that the card opens the link in a browser tab
        link.target = `_blank`
        link.rel = `noopener noreferrer`
        let div = document.createElement('div')
        div.classList.add('breweryCard')
        let brewName = document.createElement('h3')
        brewName.innerHTML = data[i].name
        let breweryType = document.createElement('p')
        breweryType.innerHTML = `Type: `
        let brewType = document.createElement('span')
        // Runs a function on the data to capitalize the first letter in the brewery_type
        let nameCapitalized = data[i].brewery_type.charAt(0).toUpperCase() + data[i].brewery_type.slice(1)
        brewType.innerHTML = nameCapitalized
        let streetName = document.createElement('p')
        streetName.innerHTML = data[i].street
        let cityName = document.createElement('p')
        cityName.innerHTML = data[i].city
        let phoneNum = document.createElement('p')
        phoneNum.innerHTML = data[i].phone
        let tempText = document.createElement('p')
        tempText.innerHTML = 'Feels like '
        let temp = document.createElement('span')
        // Takes the city name from the query of the Open Brewery API, splits it on spaces and rejoins it with a plus so it can be used in the next fetch. Used for searches with city names that have 2 or more words
        let citySearch = data[i].city.split(' ').join('+')
        // This fetch is for grabbing the temperature "feels like" from the Open Weather Map API
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'city not found') {
                    tempText.innerHTML = 'Temp not available.'
                    temp.innerHTML = ``
                    throw new Error(data.message)
                }
                temp.innerHTML = `${data.main.feels_like}&#176;`
            })
        // Appends all elements onto the div. In cases where we have p tag and span relations, the span is appended to the p tag so it can appear next to it
        div.append(brewName)
        div.append(breweryType)
        breweryType.append(brewType)
        div.append(streetName)
        div.append(cityName)
        div.append(phoneNum)
        tempText.append(temp)
        div.append(tempText)
        link.append(div)
        document.getElementById('card-container').append(link)
    }
}

// Onclick that initiates the sound effect for the click, removes all children from the parent container, selects our search inputs, checks to see which inputs are empty so that it can run a search accordingly, search triggers the fetch which then passes the data into generateCard.
submit.addEventListener('click', (e) => {
    e.preventDefault

    const audio = new Audio('./sounds/beerdrink.mp3');
    audio.play();
  
    while (botContainer.firstChild) {
        botContainer.removeChild(botContainer.firstChild)
    }

    let searchText = document.getElementById('search-text')
    let cityInput = document.getElementById('city-search').value
    let stateInput = document.getElementById('state-search').value

    // This IF checks to see if either of the inputs are empty and fetches accordingly to the Open Brewery DB API
    if (cityInput == '' && stateInput != '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}&per_page=${perPage.value}`)
        .then(res => res.json())
        .then(data => generateCard(data))
        searchText.innerHTML = `Viewing breweries in ${stateInput}...`
    } else if (cityInput != '' && stateInput == '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityInput}&per_page=${perPage.value}`)
        .then(res => res.json())
        .then(data => generateCard(data))
        searchText.innerHTML = `Viewing breweries in ${cityInput}...`
    } else if (cityInput != '' && stateInput != '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}&by_city=${cityInput}&per_page=${perPage.value}`)
        .then(res => res.json())
        .then(data => generateCard(data))
        searchText.innerHTML = `Viewing breweries in ${cityInput}, ${stateInput}...`
    }
})

// Event listener to handle enter key press when typing in city search
document.getElementById('city-search').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit-btn").click();
    }
});

// Event listener to handle enter key press when typing in state search
document.getElementById('state-search').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit-btn").click();
    }
});

// This function sets the background image of the top container (from the Unsplash API)
const setBackground = (data) => {
    let backImage = data.results[9].urls.full;
    $("#container1").css("background-image", `url(${backImage})`);
}

// This fetch runs on page load and it queries the Unsplash API and returns data to pass into setBackground
fetch(`https://api.unsplash.com/search/photos?page=1&query=brewery`, {
    headers: {
    'Accept-Version': 'v1',
    'Authorization': `Client-ID ${UN_KEY}`
    }
})
    .then(res => res.json())
    .then(data => setBackground(data))