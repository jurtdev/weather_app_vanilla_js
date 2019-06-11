// Vanilla JS Weather App
// Author: Christian Jurt
let city = ""
let url;
let key = "7df58c1c0e122eeac7f4f9f8d9c6a784";
let lat = "45.4205445";
let long = "-75.6952281";
let tempMetric = "&units=metric"
let tempImperial = "&units=Imperial"
let tempType = tempMetric;
let tempSymbol = "";
let currentLocation = "The World";
let root = document.getElementById("root");
let current = document.getElementById("current-weather");

current.innerHTML = "Current Weather in <strong>" + currentLocation + "</strong>";

document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    city = document.getElementById("city-search").value;
    showSpinner();
    loadData();
    document.getElementById("city-search").value = "";
})

function tempSymbols() {
    tempType === tempMetric ?
        tempType = tempImperial :
        tempType = tempMetric;
    showSpinner();
    loadData();
}

function searchCity(e) {
    e.preventDefault();
    city = document.getElementById("city-search").value;
    showSpinner();
    loadData(city);
}

(function() {
    showSpinner();

    function showPosition(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        loadData();
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
})();

function showSpinner() {
    let spinner = document.getElementById("spinner")
    spinner.classList.add("show");
}

function loadData() {
    root.innerHTML = "";
    city ?
        url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key + tempType :
        url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=" + key + tempType;
    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    alert("No results were found. Please search again!");
                    spinner.className = spinner.className.replace("show", "");
                    return;
                }

                response.json().then(function(data) {
                    let weather = document.createElement("span");
                    let bigTemp = document.createElement("h1");
                    let icon = document.createElement("img");
                    let table = document.createElement("table");
                    let row = document.createElement("tr");
                    let row2 = document.createElement("tr");
                    let row3 = document.createElement("tr");
                    let row4 = document.createElement("tr");
                    let cell = document.createElement("td");
                    let cell2 = document.createElement("td");
                    let cell3 = document.createElement("td");
                    let cell4 = document.createElement("td");
                    let cell5 = document.createElement("td");
                    let cell6 = document.createElement("td");
                    let cell7 = document.createElement("td");
                    let cell8 = document.createElement("td");

                    current.innerHTML = "Current Weather in <strong>" + data.name + "</strong>, " + data.sys.country;
                    tempType === "&units=metric" ?
                        tempSymbol = "C" :
                        tempSymbol = "F";

                    icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    icon.classList.add("weather-icon");
                    let sunriseDate = new Date(data.sys.sunrise * 1000);
                    let sunriseHours = sunriseDate.getHours();
                    let sunriseMinutes = "0" + sunriseDate.getMinutes();
                    let sunriseTime = sunriseHours + ":" + sunriseMinutes.substr(-2);
                    let sunsetDate = new Date(data.sys.sunset * 1000);
                    let sunsetHours = sunsetDate.getHours();
                    let sunsetMinutes = "0" + sunsetDate.getMinutes();
                    let sunsetTime = sunsetHours + ":" + sunsetMinutes.substr(-2);

                    cell.innerHTML = "Humidity";
                    cell2.innerHTML = data.main.humidity + " <span class='percent'>%</span>";
                    cell3.innerHTML = "Pressure";
                    cell4.innerHTML = data.main.pressure / 10 + " <span class='kpa'>kPa</span>";;
                    cell5.innerHTML = "Sunrise";
                    cell6.innerHTML = `${sunriseTime} <span class="am">AM</span>`;
                    cell7.innerHTML = "Sunset";
                    cell8.innerHTML = `${sunsetTime} <span class="am">PM</span>`;

                    table.appendChild(row);
                    row.appendChild(cell);
                    row.appendChild(cell2);

                    table.appendChild(row2);
                    row2.appendChild(cell3);
                    row2.appendChild(cell4);

                    table.appendChild(row3);
                    row3.appendChild(cell5);
                    row3.appendChild(cell6);

                    table.appendChild(row4);
                    row4.appendChild(cell7);
                    row4.appendChild(cell8);

                    bigTemp.innerHTML = Math.round(data.main.temp) + "<span class='degrees'>" + "\xB0" + tempSymbol + "</span>";
                    bigTemp.classList.add("big-temp");
                    weather.classList.add("weather");
                    weather.innerHTML = data.weather[0].main;
                    root.appendChild(icon);
                    root.appendChild(bigTemp);
                    root.appendChild(weather);
                    root.appendChild(table);

                    spinner.className = spinner.className.replace("show", "");
                });
            }
        )
        .catch(function(err) {
            alert('Fetch Error :-S', err);
            spinner.className = spinner.className.replace("show", "");
        });
}