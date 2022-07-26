
const os = require('os');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: null,
    port: 5432,
    pool: {
        max: parseInt(
            80 /  os.cpus().length,
        ),
        min: 0,
        idle: 10000,
        acquire: 20000,
    },
    retry: {
        match:
            'SequelizeDatabaseError: could not serialize access due to concurrent update',
        max: 3,
    },
});

module.exports = {
    Sequelize,
    sequelize,
};
