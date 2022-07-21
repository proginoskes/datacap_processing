'use strict';

if (!global.hasOwnProperty('db')) {
    let {Sequelize, sequelize} = require('../service/db');

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        Transaction: require(__dirname + '/transaction')(sequelize, Sequelize.DataTypes),
        Processor: require(__dirname + '/processor')(sequelize, Sequelize.DataTypes),
    };
}