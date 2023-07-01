const apiKey = "da473cdbc1e3a45a8093b4b404ba26f9";

apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
let cityName = "Fes";

const input = $("input");
const tempHeader = $(".weather p");
const feelsLike = $(".feelsLike");
const humidity = $(".humidity");
const weatherImg = $(".weather img");
const city = $(".city h1");
const searchBtn = $(".search button");
const locationIcon = $(".locationIcon");

const weaherParameters = ["Clouds", "Clear", "Rain", "Snow"];

searchBtn.on("click", function () {
  console.log("clicked and city is " + input.val());
  cityName = input.val();
  getData();
});

locationIcon.on("click", function () {
  if (navigator.geolocation) {
    // Request the current position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

// when the lontitue and latitude are fetched , use them to get city name and then call the funciton to get data based on city name
async function successCallback(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  var apiUrlReversed = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  const response = await fetch(apiUrlReversed);
  var data = await response.json();
  cityName = data[0].name;
  getData();
}
function errorCallback(error) {
  console.log("Error retrieving location: " + error.message);
}

async function getData() {
  const response = await fetch(apiUrl + "q=" + cityName + `&appid=${apiKey}`);
  var data = await response.json();
  const temp = Math.round(data.main.temp) + " ° C";
  const feelsLikeData = Math.round(data.main.feels_like) + " ° C";
  const humidityData = Math.round(data.main.humidity) + " g.m-3";
  const description = data.weather[0].main;
  console.log(description);
  tempHeader.text(temp);
  feelsLike.text(feelsLikeData);
  humidity.text(humidityData);
  city.text(cityName);
  if (weaherParameters.includes(description)) {
    weatherImg.attr("src", "./images/" + description + ".png");
  } else weatherImg.attr("src", "./images/weather-app.png");
}
getData();
