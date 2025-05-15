import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/showResponse.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const allDestinations = await getDataFromDB();
  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, allDestinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop(); //req.url.split('/')[3]
    const filteredDestinations = allDestinations.filter((destination) => {
      return destination.continent.toLowerCase() === continent.toLowerCase();
    });
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
