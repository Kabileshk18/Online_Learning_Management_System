const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { to, TE } = require('../responseHandler');
const { ERROR } = require('../constants/messages');
const cryptoService = require('../services/crypto.service')
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('users', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        firstName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        role : {
            type : DataTypes.ENUM('admin', 'instructor', 'student'),
            defaultValue : 'student'
        },
        createdAt : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW,
        },
        updatedAt : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    }, {
        tableName : 'users'
    });
    Model.associate = function(models){
        this.hasMany(models.courses, ({foreignKey : 'instructorId'}));
        this.belongsToMany(models.courses, {through : models.enrollments, foreignKey : 'studentId'});
    };
    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
          let salt, hash;
          let rounds = crypto.randomInt(4, 10);
          salt = await bcrypt.genSalt(rounds);
          if (err) { console.log('error in encrypting in user account', err.message);}
          [err, hash] = await to(bcrypt.hash(user.password, salt));
          if (err) { console.log('error in hashing in user account', err.message);}
          user.password = hash;
        }
      });
      Model.prototype.comparePassword = async function(pw) {
        let err, pass;
        [err, pass] = await to(bcrypt.compare(pw, this.password))
        if(err) TE(err);
        if(!pass) TE(ERROR.INVALID_PASS)
        return this;
      }
      Model.prototype.getToken = async function(user){
        let err, encryptedToken;
        const token = "Bearer "+jwt.sign({
            id:user.dataValues.id,
            firstName : user.dataValues.firstName,
            email:user.dataValues.email,
            role:user.dataValues.role
        }, CONFIG.jwt_encryption, {expiresIn:CONFIG.jwt_expiration});
        [err, encryptedToken] = await to(cryptoService.encrypt(token));
        if(err) TE(err.message);
        return encryptedToken;
      }
    return Model;
}