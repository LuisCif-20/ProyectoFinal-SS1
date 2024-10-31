const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const CONFIG = require('./config/config');
const router = require('./api/routes');
const { testConnection } = require('./config/dbConnection');
const errorHandler = require('./api/middlewares/errorHandler');

const { APP_PORT, BASE_URL } = CONFIG.app;

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(BASE_URL, router);
app.use(errorHandler);

const initApp = async () => {
    try {
        await testConnection();
        app.listen(APP_PORT);
        console.log(`---- Application Started On Port: ${APP_PORT} ----`);
    } catch (error) {
        console.error('----- Application Failed To Start -----', '\n', error);
    }
};

initApp();