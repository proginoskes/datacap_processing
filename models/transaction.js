'use strict';

module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define('Transaction',
        {
            ref_no: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            amount: {type: DataTypes.FLOAT},
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            tableName: 'transactions'
        },
    );
    return Transaction;
}