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

console.log(dayOneEl);


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
    deleteChild();
    for (var i = 0; i < 5; i++) {
        // console.log("butts")
        console.log(daily[i].temp.day, daily[i].humidity, daily[i].wind_speed)

        var firstDay = document.createElement("p")
        firstDay.textContent = "Day" + (i + 1).toString()

        var dailyTemp = document.createElement("p")
        var dailyWind = document.createElement("p")
        var dailyHu = document.createElement("p")
        dailyTemp.textContent = daily[i].temp.day
        dailyWind.textContent = daily[i].wind_speed
        dailyHu.textContent = daily[i].humidity
        console.log(daysEl)
        daysEl[i].appendChild(firstDay)
        daysEl[i].appendChild(dailyTemp)
        daysEl[i].appendChild(dailyWind)
        daysEl[i].appendChild(dailyHu)

    }



    //     if (daysEl[0].hasChildNodes()) {
    //         console.log("butts")
    //         dayOneEl.removeChild(dailyTemp)
    //         console.log(dayOneEl)

    //     }
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