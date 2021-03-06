const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fuerza: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCreated:{
      type: DataTypes.BOOLEAN,
      get(){
        return true
      }
    }
  });

  
  sequelize.define('tipo', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  })
};
