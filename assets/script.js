var weatherFormEl = document.getElementById("form-control me-2");
weatherFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  var weatherLocation = document.getElementById("weatherLocation").value.trim();
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?" +
      weatherLocation +
      ",GB" +
      "&appid=180d3a272c4adc1206afaf1424db4d64"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.list.length; i++) {
        var weatherInformation = data.list[i];
        var date = weatherInformation.dt_txt.split(" ")[0];
      }
    });
});
