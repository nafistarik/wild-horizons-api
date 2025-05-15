import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/showResponse.js";
import filterByParams from "./utils/filterByParams.js";
import filterBySearchParams from "./utils/filterBySearchParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);
  const allDestinations = await getDataFromDB();
  let filteredDestinations = filterBySearchParams(allDestinations, queryObj);

  if (urlObj.pathname === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, filteredDestinations);

  } else if (urlObj.pathname.startsWith("/api/continent") && req.method === "GET") {
    const continent = urlObj.pathname.split("/").pop(); //req.url.split('/')[3]
    filteredDestinations = filterByParams(
      filteredDestinations,
      "continent",
      continent
    );
    sendJSONResponse(res, 200, filteredDestinations);

  } else if (urlObj.pathname.startsWith("/api/country") && req.method === "GET") {
    const country = urlObj.pathname.split("/").pop();
    filteredDestinations = filterByParams(
      filteredDestinations,
      "country",
      country
    );
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
