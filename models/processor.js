module.exports = (sequelize, DataTypes) => {
    var Processor = sequelize.define(
        'Processor',
        {
            name: {type: DataTypes.STRING},
            small_pct: {type: DataTypes.FLOAT},
            small_flat: {type: DataTypes.FLOAT},
            large_pct: {type: DataTypes.FLOAT},
            large_flat: {type: DataTypes.FLOAT}
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            tableName: 'processor'
        }
    );

    return Processor;
}
