import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from "dotenv"

dotenv.config();

const app = express();

const {PORT, HOST, API_SERVICE_URL } = process.env;

// Information
app.get("/info", (req, res, next) => {
    res.send(`This is a proxy service for ${API_SERVICE_URL}`);
});

// Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        [`^/api`]: '',
    },
}));

app.use(express.static('src/frontend'));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});