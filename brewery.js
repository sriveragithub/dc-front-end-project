
const WEATHER_KEY = config.WEATHER_API_KEY
const UN_KEY = config.UNSPLASH_KEY

let submit = document.getElementById('submit-btn')
let perPage = document.getElementById('per-page')
let botContainer = document.getElementById('container2')

// function to generate the card information
const generateCard = (data) => {
    console.log(data) //testing

    for (let i = 0, len = data.length; i < len; i++) {
        console.log(data[i]);

        let div = document.createElement('div')
        div.classList.add('breweryCard')
        let brewName = document.createElement('h3')
        brewName.setAttribute('id', `brew${i}`)
        brewName.innerHTML = data[i].name
        let cityName = document.createElement('p')
        cityName.setAttribute('id', `city${i}`)
        cityName.innerHTML = data[i].city
        let phoneNum = document.createElement('p')
        phoneNum.setAttribute('id', `phone${i}`)
        phoneNum.innerHTML = data[i].phone
        let tempText = document.createElement('span')
        tempText.innerHTML = 'Feels like '
        let temp = document.createElement('span')
        let citySearch = data[i].city.split(' ').join('+')
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === 'city not found') {
                    throw new Error(data.message)
                    temp.innerHTML = `n/a`
                }
                temp.innerHTML = `${data.main.feels_like}&#176;`
            })
        div.append(brewName)
        div.append(cityName)
        div.append(phoneNum)
        div.append(tempText)
        div.append(temp)
        document.getElementById('container2').append(div)
    }
}

// onclick that calls generateCard on all of the information pulled from fetching the DB
submit.addEventListener('click', (e) => {
    e.preventDefault

    while (botContainer.firstChild) {
        botContainer.removeChild(botContainer.firstChild)
    };

    let stateInput = document.getElementById('state-search').value
    let cityInput = document.getElementById('city-search').value

    if (cityInput == '' && stateInput != '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}&per_page=${perPage.value}`)
        .then(res => res.json())
        .then(data => generateCard(data))
    } else if (cityInput != '' && stateInput == '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityInput}&per_page=${perPage.value}`)
        .then(res => res.json())
        .then(data => generateCard(data))
    } else if (cityInput != '' && stateInput != '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}&by_city=${cityInput}&per_page=${perPage.value}`)
        .then(res => res.json())
        .then(data => generateCard(data))
    }
    
  
})

const useData = (data) => {
    console.log(data)
    let backImage = data.results[9].urls.full;
    $("#container1").css("background-image", `url(${backImage})`);
}

let query = 'brewery'

fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
    headers: {
    'Accept-Version': 'v1',
    'Authorization': `Client-ID ${UN_KEY}`
    }
})
    .then(res => res.json())
    .then(data => useData(data))