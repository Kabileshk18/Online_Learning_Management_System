module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('enrollments', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        studentId : {
            type : DataTypes.INTEGER,
        },
        courseId : {
            type : DataTypes.INTEGER,
        },
        status : {
            type : DataTypes.ENUM('enrolled','completed'),
            defaultValue : 'enrolled'
        },
        createdAt : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    }, {
        tableName : 'enrollments'
    });

    Model.associate = function(models){
        this.belongsTo(models.users, ({foreignKey : 'studentId'}));
        this.belongsTo(models.courses, ({foreignKey : 'courseId'}));
    }

    return Model;
}