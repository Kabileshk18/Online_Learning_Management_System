module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('courses', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        instructorId : {
            type : DataTypes.INTEGER
        },
        createdAt : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        },
        updatedAt : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    }, {
        tableName : 'courses'
    });

    Model.associate = function(models){
        this.belongsTo(models.users, ({foreignKey : 'instructorId'}));
        this.belongsToMany(models.users, { through : models.enrollments, foreignKey : 'courseId' });
    }

    return Model;
}