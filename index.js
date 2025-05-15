import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/showResponse.js";
import filterByParams from "./utils/filterByParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const allDestinations = await getDataFromDB();
  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, allDestinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop(); //req.url.split('/')[3]
    const filteredDestinations = filterByParams(
      allDestinations,
      "continent",
      continent
    );
    sendJSONResponse(res, 200, filteredDestinations);
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const country = req.url.split("/").pop();
    const filteredDestinations = filterByParams(allDestinations, country);
    sendJSONResponse(res, 200, filteredDestinations);
  } else {
    sendJSONResponse(res, 404, {
      error: "Not Found",
      message: "The requested route does not exist.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
