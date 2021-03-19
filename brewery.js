const WEATHER_KEY = config.WEATHER_API_KEY
const UN_KEY = config.UNSPLASH_KEY



const searchInput = document.getElementsByClassName("searchInput");
const searchButn = document.getElementsByClassName("search-butn");
const breweryList = document.getElementsByClassName("brewery-list");


document.getElementById("searchButn").addEventListener("click", function (event) {
    event.preventDefault();
    const brewerySearch = event.target
        console.log(brewerySearch.searchInput.value)
        const breweryInfo = brewerySearch.searchInput.value 
        
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${searchInput.value}`)
        .then(response => response.json())
        .then(response => breweryList(response))
    

});
console.log("IT WORKS!!!")

function addBreweryList(event){
    event.preventDefault();
    const breweryDiv = document.createElement("div");
        console.log(form.breweryDiv)
    const breweryTitle = form.breweryDiv.value 

    breweryDiv.appendChild("beerList");


}

