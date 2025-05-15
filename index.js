import http from 'node:http';
import { getDataFromDB } from './database/db.js';

const PORT = 8000;

const server = http.createServer( async (req, res) => {
    const allDestinations = await getDataFromDB();
    if (req.url === '/api' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(allDestinations));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Not Found',
            message: 'The requested route does not exist.',
        }));
    }
})

server.listen( PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})