const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bc73b48af1394c98011c6dd36a650c66&query=${lat},${lon}&units=m`

  request({ url, json:true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather services', undefined);
    } else if (body.error) {
      callback('Unable to find the weather in this location', undefined);
    } else {
      const current = body.current
      callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees outside. It feels like ${current.feelslike} degrees. The humidity is at ${current.humidity}%`)
    }
  })
}

module.exports = forecast;
