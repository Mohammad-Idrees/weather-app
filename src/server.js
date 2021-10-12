const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");

// Setup ejs engine and views location
app.set("view engine", "ejs");
app.set("views", viewsPath);
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Idrees",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Idrees",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		helpText: "This is some helpful text",
		name: "Idrees",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location: location,
					address: req.query.address,
				});
			});
		}
	);
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		message: "Help article not found",
		name: "Idrees",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		message: "Page not found",
		name: "Idrees",
	});
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
