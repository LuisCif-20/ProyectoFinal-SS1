const { readdirSync } = require('fs');
const { Router } = require('express');

const ROUTER_PATH = `${__dirname}`;
const router = Router();

readdirSync(ROUTER_PATH).forEach((filename) => {
    if (filename !== 'index.js') {
        const route = filename.split('R').shift();
        const routerModule = require(`./${filename}`);
        router.use(`/${route}`, routerModule);
    }
});

module.exports = router;