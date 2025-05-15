import http from 'node:http';
import { getDataFromDB } from './database/db.js';

const PORT = 8000;

const server = http.createServer( async (req, res) => {
    const allDestinations = await getDataFromDB();
    if (req.url === '/api' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(allDestinations));
    }
})

server.listen( PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})