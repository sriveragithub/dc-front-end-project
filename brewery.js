const WEATHER_KEY = config.WEATHER_API_KEY
const UN_KEY = config.UNSPLASH_KEY

const useData = (data) => {
    console.log(data)
}

const beerURL = `https://api.openbrewerydb.org/breweries?by_state=georgia`

fetch(beerURL)
    .then(res => res.json())
    .then(data => useData(data))

let input = '30312'

fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=${WEATHER_KEY}&units=imperial`)
    .then(res => res.json())
    .then(data => useData(data))


let query = 'beer'

fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
    headers: {
    'Accept-Version': 'v1',
    'Authorization': `Client-ID ${UN_KEY}`
    }
})
    .then(res => res.json())
    .then(data => useData(data))