import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'

const app = express();
const PORT = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server })

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
