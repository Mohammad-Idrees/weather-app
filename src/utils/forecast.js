const request = require("request");

const forecast = (latitide, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${latitide},${longitude}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			const { weather_descriptions, temperature, feelslike } =
				body.current;
			callback(
				undefined,
				`${weather_descriptions}. It is currently ${temperature} degrees out. Feels like ${feelslike}.`
			);
		}
	});
};

module.exports = forecast;
