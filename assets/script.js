let weather = {
    apiKey: "414d025ca35931bbf77b74ae8cc93301",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, feels_like, pressure } = data.main;
      const { speed } = data.wind;
      const { visibility } = data;
      const today = new Date();
      const month = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const date = today.getUTCDate()+ " " +month[today.getMonth()]+ "," + " " +today.getUTCFullYear();
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°" + " " + "C";
      document.querySelector(".date").innerText = date;
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".visibility").innerText =
        "Visibility: " + visibility/1000 + " km";
      document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + "°" + " " + "C";
      document.querySelector(".pressure").innerText = "Pressure: " + pressure + "mb";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  let geocode = {
    reverseGeocode: function (latitude, longitude)  {
      var api_key = 'b0ce2a556e454c8dbb319d5164c1392d';
  
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'
  
    var request_url = api_url
      + '?'
      + 'key=' + api_key
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1';
  
    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward
  
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
  
    request.onload = function() {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes
  
      if (request.status === 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        weather.fetchWeather(data.results[0].components.city);
      } else if (request.status <= 500){ 
        // We reached our target server, but it returned an error
                             
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    };
  
    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");        
    };
  
    request.send();  // make the request
    }
    
    ,getLocation: function() {
      function success (data) {
        geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
      }
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, console.error)
      }
      else {
        weather.fetchWeather(" Eluru ");
      }
      
    }
  }
  
/*Here we display the 5 days forecast for the current city.
function forecast(city){
  var dayover= false;
  var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+city+"&appid="+APIKey;
  $.ajax({
      url:queryforcastURL,
      method:"GET"
  }).then(function(response){
      
      for (i=0;i<5;i++){
          var date= new Date((data.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
          var iconcode= data.list[((i+1)*8)-1].weather[0].icon;
          var icon="https://openweathermap.org/img/wn/"+iconcode+".png";
          var tempK= data.list[((i+1)*8)-1].main.temp;
          var humidity= data.list[((i+1)*8)-1].main.humidity;
      
          $("#fDate"+i).html(date);
          $("#fImg"+i).html("<img src="+icon+">");
          $("#fTemp"+i).html(tempF+"&#8457");
          $("#fHumidity"+i).html(humidity+"%");
      }
      
  });
}
*/
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  geocode.getLocation();
