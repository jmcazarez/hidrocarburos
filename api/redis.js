
const host = '10.20.30.20';
const port = 6379;
const password = 'Adsum123%';

const url = `redis://${host}:${port}`;

/* ----- Configuración REDIS ---- */

const { createClient } = require('redis');

// const redis = createClient({
//     url,
//     password
// });

// (async () => {
//     await redis.connect();
// })();

// redis.on('connect', (err) => {
//     if (err) console.log('Error al conectar a redis:', err);
//     console.log('REDIS on');
// });

/* ----------------------------- */

module.exports = redis;