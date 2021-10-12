const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=9e540c74ea05c4efcff28b2316e3ab6e&query=40,-75`;

const request = http.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
    console.log(chunk);
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
