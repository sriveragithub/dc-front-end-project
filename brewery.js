const WEATHER_KEY = config.WEATHER_API_KEY
const UN_KEY = config.UNSPLASH_KEY

let submit = document.getElementById('submit-btn')

// function to generate the card information
const generateCard = (data) => {
    console.log(data) //testing

    for (let i = 0, len = data.length; i < len; i++) {
        console.log(data[i]);

        let div = document.createElement('div')
        div.classList.add('card')
        let brewName = document.createElement('h3')
        brewName.setAttribute('id', `brew${i}`)
        brewName.innerHTML = data[i].name
        let cityName = document.createElement('p')
        cityName.setAttribute('id', `city${i}`)
        cityName.innerHTML = data[i].city
        let phoneNum = document.createElement('p')
        phoneNum.setAttribute('id', `phone${i}`)
        phoneNum.innerHTML = data[i].phone
        div.append(brewName)
        div.append(cityName)
        div.append(phoneNum)
        document.getElementById('container1').append(div)
    }
}

// onclick that calls generateCard on all of the information pulled from fetching the DB
submit.addEventListener('click', (e) => {
    e.preventDefault
    let input = document.getElementById('state-search').value
    console.log(input)
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${input}`)
    .then(res => res.json())
    .then(data => generateCard(data))
  
})









// const useData = (data) => {
//     console.log(data)
// }

// let query = 'beer'

// fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
//     headers: {
//     'Accept-Version': 'v1',
//     'Authorization': `Client-ID ${UN_KEY}`
//     }
// })
//     .then(res => res.json())
//     .then(data => useData(data))
