 const api = {
     key: "c021c08ff7bae2a15aac2ae830266b51",
     base: "https://api.openweathermap.org/data/2.5/"
 }

const searchBtn = document.getElementById("clickBtn").addEventListener('click', function(){
    const inputValue = document.getElementById("inputValue").value;
     getResults(inputValue);
     document.getElementById("inputValue").value="";

})



 const searchBox = document.querySelector('.search-box');
 searchBox.addEventListener('keypress', setQuery);

 function setQuery(evt) {
    if(evt.keyCode == 13){
        getResults(searchBox.value);
     }
}

 
 function getResults (query) {
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather => {
         return weather.json();
     }).then(displayResults);
 }
  


 function displayResults (weather) {
     console.log(weather);
     let city = document.querySelector('.location .city');
     city.innerText = `${weather.name}, ${weather.sys.country}`;

     let now = new Date();
     let date = document.querySelector('.location .date');
     date.innerText = dateBuilder(now);

     let temp = document.querySelector('.current .temp');
     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

     let weather_el = document.querySelector('.current .weather');
     weather_el.innerText = weather.weather[0].main;

     let hiLow = document.querySelector('.hi-low');
     hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
 }

 function dateBuilder (d){
     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();
     return `${day} ${date} ${month} ${year}`;
 }