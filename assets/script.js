var today = moment().unix()

var submitButton = $(".btn")
var inputEl = $("textarea.form-control")
var daysEl = $(".days")
var historyEl = $(".history")

var dayOneEl = $("#day1")
var dayTwoEl = $("#day2")
var dayThreeEl = $("#day3")
var dayFourEl = $("#day4")
var dayFiveEl = $("#day5")


submitButton.on("click", function(fiveDayForecast) {

    var city = inputEl[0].value
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2dbb03e35a692bed136d85c3f3ee91b2"

    fetch(apiUrl).then(response => {
        response.json().then(function(data) {
            var lat = data.coord.lat
            var lon = data.coord.lon
            console.log(lat, lon)

            fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=2dbb03e35a692bed136d85c3f3ee91b2"


            fetch(fiveDayURL).then(response => {
                response.json().then(function(forecast) {
                    console.log(forecast.daily)
                    console.log(forecast.current)

                    displayDays(forecast.daily);
                    displayCurrent(forecast.current)
                    saveCity(inputEl[0].value)
                })

            })

        })
    })
})

var displayDays = function(daily) {
    console.log(daily)
    for (var i = 0; i < 5; i++) {
        // console.log("butts")
        console.log(daily[i].temp.day, daily[i].humidity, daily[i].wind_speed)

        var dailyTemp = document.createElement("p")
        var dailyWind = document.createElement("p")
        var dailyHu = document.createElement("p")
        dailyTemp.textContent = daily[i].temp.day
        dailyWind.textContent = daily[i].wind_speed
        dailyHu.textContent = daily[i].humidity
        console.log(daysEl)
        daysEl[i].appendChild(dailyTemp)
        daysEl[i].appendChild(dailyWind)
        daysEl[i].appendChild(dailyHu)

        if (daysEl[i].hasChildNodes()) {
            console.log("butts")

            var butts = document.createElement("p")
            butts.textContent = "she got the yams"
            daysEl[i].replaceChild(butts, daysEl[i].children[i])

        }

    }

}

var displayCurrent = function(current) {
    console.log(current)

    var currentTemp = document.getElementById("temp")
    var currentUV = document.getElementById("UV")
    var currentWind = document.getElementById("wind")
    var currentHumid = document.getElementById("humid")

    currentTemp.textContent = current.temp
    currentHumid.textContent = current.humidity
    currentUV.textContent = current.uvi
    currentWind.textContent = current.wind_speed
}

var saveCity = function(history) {
    console.log(history)
    console.log(historyEl)

    for (var i = 0; i < historyEl.length; i++) {
        var leCity = document.createElement("li")
        leCity.textContent = history
        historyEl[i].appendChild(leCity)
    }
}