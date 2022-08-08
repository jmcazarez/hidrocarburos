const Sequelize = require('sequelize');

const db = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const pwd = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(db, user, pwd, {
    host: host,
    port: port,
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false,
    }
});

sequelize.authenticate()
    .then(() => {
        console.log(`Conectado a la bd : ${host} : ${port}`);
    })
    .catch(err => {
        console.log('No se conecto a la bd: ' + err)
    });

module.exports = sequelize;