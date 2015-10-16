var Api = {
  getLocation(city) {
    city = city.toLowerCase().trim();
    var apiKey = 'e635e18c566727900c458fa2ae6c4e03';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    return fetch(url).then((res) => res.json());
  }
};

module.exports = Api;