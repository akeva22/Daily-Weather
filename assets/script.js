var today = moment().unix()

var submitButton = $(".btn")
var inputEl = $("textarea.form-control")
var daysEl = $(".days")
var historyEl = $(".history")

submitButton.on("click", function(fiveDayForecast) {

    var city = inputEl[0].value
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2dbb03e35a692bed136d85c3f3ee91b2"

    fetch(apiUrl).then(response => {
        response.json().then(function(data) {
            var lat = data.coord.lat
            var lon = data.coord.lon
            console.log(lat, lon)

            fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=2dbb03e35a692bed136d85c3f3ee91b2"


            fetch(fiveDayURL).then(response => {
                console.log(response.url)
                response.json().then(function(forecast) {
                    console.log(forecast)
                    console.log(forecast.current)

                    displayDays(forecast.daily);
                    displayCurrent(forecast.current)
                    saveCity([inputEl[0].value, response.url])
                })

            })

        })
    })
})

var displayDays = function(daily) {
    console.log(daily)
    deleteChild();
    for (var i = 0; i < 5; i++) {
        // console.log("butts")
        console.log(daily[i].temp.day, daily[i].humidity, daily[i].wind_speed)

        var firstDay = document.createElement("p")
        firstDay.textContent = "Day " + (i + 1).toString()

        var dailyTemp = document.createElement("p")
        var dailyWind = document.createElement("p")
        var dailyHu = document.createElement("p")
        dailyTemp.textContent = "Temp: " + daily[i].temp.day + " °F"
        dailyWind.textContent = "Wind: " + daily[i].wind_speed + " MPH"
        dailyHu.textContent = "Humidity: " + daily[i].humidity + "%"
        console.log(daysEl)
        daysEl[i].appendChild(firstDay)
        daysEl[i].appendChild(dailyTemp)
        daysEl[i].appendChild(dailyWind)
        daysEl[i].appendChild(dailyHu)

    }

}

var displayCurrent = function(current) {
    console.log(current)

    var currentTemp = document.getElementById("temp")
    var currentUV = document.getElementById("UV")
    var currentWind = document.getElementById("wind")
    var currentHumid = document.getElementById("humid")

    currentTemp.textContent = "Temp: " + current.temp + " °F"
    currentHumid.textContent = "Humidity: " + current.humidity + "%"
    currentUV.textContent = "UVI Index: " + current.uvi
    currentWind.textContent = "Wind: " + current.wind_speed + " MPH"
}

var saveCity = function(history) {

    console.log(history)
    console.log(historyEl)


    for (var i = 0; i < historyEl.length; i++) {
        var leCity = document.createElement("li")
        var leCityLink = document.createElement("a")
        leCity.textContent = leCityLink
        leCityLink.textContent = history[0]
        leCity.appendChild(leCityLink)
        leCityLink.setAttribute("href", history[1])
        historyEl[i].appendChild(leCity)
        localStorage.setItem(history[0], history[1])


    }
}


function deleteChild() {
    var e = document.getElementById("day1");
    var f = document.getElementById("day2");
    var g = document.getElementById("day3");
    var h = document.getElementById("day4");
    var i = document.getElementById("day5");

    e.innerHTML = "";
    f.innerHTML = "";
    g.innerHTML = "";
    h.innerHTML = "";
    i.innerHTML = "";
}