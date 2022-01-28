var apiKey = "180d3a272c4adc1206afaf1424db4d64";

// Saves city into local storage
var savedSearch = JSON.parse(localStorage.getItem("pastForecastHistory")) || [];

for (i = 0; i < savedSearch.length; i++) {
  var cityBtn = $(
    `<button class="list-group-item" data-city="${savedSearch[i]}">${savedSearch[i]}</button>`
  );

  $("#city-list").prepend(cityBtn);
}
// Displays search data of cities onto weather div container
function weatherDisplay(city) {
  // URL link to desired data
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response);

    var tempC = response.main.temp;
    var todayDate = moment().format("MM/DD/YYYY");
    var weatherIcon = response.weather[0].icon;
    var weatherURL =
      "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    // Draws APi Data to weather div container
    $("#city").html("<h3>" + response.name + " " + todayDate + "</h3>");
    $("#weatherPicture").attr("src", weatherURL);
    $("#resultTemp").text("Temperature: " + tempC.toFixed(2) + " °C");
    $("#resultHum").text("Humidity: " + response.main.humidity + "%");
    $("#resultWind").text("Wind Speed: " + response.wind.speed + " MPH");
    retrieveUV(response.coord.lat, response.coord.lon);
  });
}

// Five day weather forecast
function fiveDayForecast(city) {
  var forecast5 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  $.ajax({
    url: forecast5,
    method: "GET",
  }).then(function (response) {
    // console.log(response);

    var response = response.list;

    $(document).ready(function () {
      $("#date").text(`(${moment().format("l")})`);
      for (i = 1; i < 7; i++) {
        var forecastDate = $(`#date${i}`);
        forecastDate.text(moment().add(`${i}`, "d").format("l"));
      }

      for (i = 0; i < response.length; i++) {
        $("#weatherIcon" + i).attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response[i].weather[0].icon +
            "@2x.png"
        );
        $("#temp" + i).text(
          "Temp: " + Math.round(response[i].main.temp) + " °C"
        );
        $("#humid" + i).text("Humidity: " + response[i].main.humidity + "%");
      }
    });
  });
}
