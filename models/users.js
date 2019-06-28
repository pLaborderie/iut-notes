module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordRecoveryToken: {
      type: DataTypes.UUID
    },
    tokenExpiration: {
      type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  });
  users.associate = models => {
    users.hasMany(models.notes);
  }

  return users;
}