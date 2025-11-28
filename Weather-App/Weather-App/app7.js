const apiKey = "e16b4b7e581243be97275607252611";

const searchInput = document.getElementById("search");
const search = document.getElementById("search_icon");
const weatherIcon=document.getElementById("weathericon");
const cityName = document.querySelector(".location h4");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const precipitation = document.getElementById("Precipitation"); 
const humidity = document.getElementById("Humidity");
const wind = document.getElementById("Wind");
const boxes= document.querySelectorAll(".box");

// Parse URL parameter
const params = new URLSearchParams(window.location.search);// got query from the home page city=delhi
const city = params.get("city");// fetch the city key val

if(city) {
    fetchweather(city);   // Call your fetch function
    fetchForecast(city);  // Call forecast function
    setBackground();
} else {
    // Default city if none is passed
    fetchweather("Dehradun");
    fetchForecast("Dehradun");
    setBackground();
}


async function fetchweather(city) {// fetch current weather
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  
  try{
    let response=await fetch(url);
  let data=await response.json();

    cityName.innerText= city;
    description.innerText= data.current.condition.text;
    temp.innerText=  data.current.temp_c+"℃";
    precipitation.innerText= "Precipitation: "+ data.current.precip_mm+"mm";
    humidity.innerText= "Humidity: "+data.current.humidity + "%";
    wind.innerText= "Wind: "+data.current.wind_mph+ "mph";
    weatherIcon.src="https:"+ data.current.condition.icon;
  }
  catch(error){
    alert('No such city found. Enter a different city name');
}
}
async function fetchForecast(city) {// fetch 3 day weather
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
    try{
      let response=await fetch(url);
      let data= await response.json();
      console.log(data);
      boxes[0].querySelector("img").src="https:"+ data.forecast.forecastday[0].day.condition.icon;
      boxes[1].querySelector("img").src="https:"+ data.forecast.forecastday[1].day.condition.icon;
      boxes[2].querySelector("img").src="https:"+ data.forecast.forecastday[2].day.condition.icon;

      boxes[0].querySelector(".temp").innerText=data.forecast.forecastday[0].day.avgtemp_c+ "℃";
      boxes[1].querySelector(".temp").innerText=data.forecast.forecastday[1].day.avgtemp_c+ "℃";
      boxes[2].querySelector(".temp").innerText=data.forecast.forecastday[2].day.avgtemp_c+ "℃";

      boxes[0].querySelector(".desc").innerText=data.forecast.forecastday[0].day.condition.text;
      boxes[1].querySelector(".desc").innerText=data.forecast.forecastday[1].day.condition.text;
      boxes[2].querySelector(".desc").innerText=data.forecast.forecastday[2].day.condition.text;
    }
    catch(error){
      alert("Can't fetch weather");
    }
}
searchInput.addEventListener("keypress",(e)=>{
  if(e.key=='Enter'){
    fetchweather(searchInput.value);
    fetchForecast(searchInput.value);
    setBackground();
  }
})
search.addEventListener("click", ()=>{
fetchweather(searchInput.value);
fetchForecast(searchInput.value);
setBackground();
})

function setBackground(weather) {//set background according to the time
    const hour = new Date().getHours();
    let timeOfDay = "";

    if (hour >= 5 && hour < 12) timeOfDay = "day";
    else if (hour >= 12 && hour < 18) timeOfDay = "evening";
    else timeOfDay = "night";

    document.body.className = ""; // reset classes

    if (timeOfDay === "day") {
        document.body.classList.add("day-bg");
    } 
    else if (timeOfDay === "evening") {
        document.body.classList.add("evening-bg");
    } 
    else {
        document.body.classList.add("night-bg");
    }
}
