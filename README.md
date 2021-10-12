## Weather-app

[Click Here](https://weather-app-idrees.herokuapp.com/) to view deployed version

## Description
- You can check out the weather forecast by searching for the location
- The app uses two free tier apis 
  1. Mapbox - To geocode the given location into latitude and longitude
  2. WeatherStack -  To fetch the forecast information using the acquired latitude and longitude
- Used ejs templating engine for displaying views and express for the backend server.
- Endpoint /weather?address=value can be used for getting a json reponse of the forecast.
