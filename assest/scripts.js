const apiKey = "4e8ee0320beb9f0292c0eadfcbaad945"
const iconUrl = "http://openweathermap.org/img/wn/"
const base = "https://api.openweathermap.org/data/2.5/"
let currentDate = moment().format("M/DD/YYYY");



function getApi(city){
  
  const requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

  console.log(requestUrl)
  fetch(requestUrl)
  
  .then(function(data){
    return data.json();
  })

  .then(function(data) {
    console.log(data);
    
    displayCurrentWeather(data.list, data.city.name)
    displayForecast(data.list)
    storeCity(data.city.name)
    
       
  })
}

function displayCurrentWeather(data, getCity) {
  $("#weatherThings").empty()
  var cityHeading = $("#cityDate");
  cityHeading.html("")
  cityHeading.text(getCity + " " + "(" + currentDate + ")")

  currentDisplay = `
    <div id="forecast-icon">
      <img src="https://openweathermap.org/img/w/${data[0].weather[0].icon}.png">
    </div>
    <div>
      <p> Temperature: ${data[0].main.temp} F </p>
      <p> Humidity: ${data[0].main.humidity}% </p>
      <p> Wind Speed: ${data[0].wind.speed} MPH </p>
    </div>
    `

    $("#weatherThings").append(currentDisplay);
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("fiveDay");
  forecastContainer.innerHTML = " ";

  for (let i = 1; i < data.length; i += 8) {
    const col = document.createElement("div");
    col.setAttribute("class", "col-2");
    const txt = document.createElement("h5");
    const icon = document.createElement("img");
    icon.setAttribute("src", "https://openweathermap.org/img/w/" + 
      data[i].weather[0].icon + ".png");
    const temp = document.createElement("p");
    const humidity = document.createElement("p");
    const wind = document.createElement("p");

    txt.textContent = data[i].dt_txt;
    temp.textContent = `Temperature: ${data[i].main.temp} F`;
    humidity.textContent = `Humidity: ${data[i].main.humidity}%`;
    wind.textContent = `Wind Speed: ${data[i].wind.speed} MPH`;

    col.append(txt,icon,temp,humidity,wind);
    forecastContainer.append(col);
}
}

function storeCity(getCity) {
  localStorage.setItem("City Name", getCity)

  cityButtons = 
    `<button type="button" class="btn btn-secondary" id="store1">${getCity}</button>`;
    $("#storeCity").append(cityButtons);
    
    return(cityButtons);

}

  $("#storeCity").on("click", function pullCity(cityButtons) {
    console.log("2nd button clicked");
    var pullCity = localStorage.getItem("City Name");
  
    console.log(pullCity)


    getApi(cityButtons.target.innerHTML);
  })




seachBtn.addEventListener("click", function getCity(){
  var getCity = $("#inputCity").val();
  console.log (getCity)

  getApi(getCity)
});