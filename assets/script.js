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
    