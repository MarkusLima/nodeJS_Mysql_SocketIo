const { DataTypes } = require('sequelize');
const { User, sequelize } = require('./userModel');
const { gerarLetrasAleatorias } = require('../config/tools');

// Definindo o modelo de Room
const Room = sequelize.define('room', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Room.User = Room.belongsTo(User);
User.Room = User.hasMany(Room);

const CreateOrUpdate = async (data) => {

    if (data.userId) {

        const existingRecord  = await Room.findOne({
            where: { userId: data.userId }
        });

        if (existingRecord) {
            existingRecord.uuid = data.uuid;
            await existingRecord.save();
        } else {
            var token = gerarLetrasAleatorias(45);
            await Room.create( { userId:data.userId, uuid:data.uuid, token:token } );
        }

    }

    return await Room.findAll(
        {
            include: [{
              model: User,
              required: true,
              right: true // has no effect, will create an inner join
            }]
        }
    );
}

const Destroy = async (id) => {

    if (id) {

        const existingRecord  = await Room.findOne({
            where: { uuid: id }
        });

        if (existingRecord) {
            await existingRecord.destroy();
        }

    }

    return await Room.findAll(
        {
            include: [{
              model: User,
              required: true,
              right: true // has no effect, will create an inner join
            }]
        }
    );
}

module.exports = { Room, CreateOrUpdate, Destroy, sequelize};