const WEATHER_KEY = config.WEATHER_API_KEY
const UN_KEY = config.UNSPLASH_KEY

let submit = document.getElementById('submit-btn')

const generateCard = (data) => {
    console.log(data) //testing

    // fetch(`http://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=${WEATHER_KEY}&units=imperial`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if (error) {
    //             let temp = 'n/a'
    //             console.log(temp)
    //             return temp
    //         }
    //         let temp = data.main.temp
    //         console.log(temp)
    //         return temp
    //     })

    for (let i = 0, len = data.length; i < len; i++) {
        console.log(data[i]);


        // let searchedCity = data[i].city.split(' ').join('+')

        // let temp;

        // fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${WEATHER_KEY}&units=imperial`)
        // .then(res => res.json())
        // .then(data => {
        //     if (error) {
        //         temp = 'n/a'
        //         console.log(temp)
        //         return temp
        //     }
        //     temp = data.main.temp
        //     console.log(temp)
        //     return temp
        // })

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
        // let tempInCity = document.createElement('p')
        // tempInCity.classList.add('temp')
        // tempInCity.innerHTML = temp
        div.append(brewName)
        div.append(cityName)
        div.append(phoneNum)
        // div.append(tempInCity)
        document.getElementById('container1').append(div)
    }
}

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