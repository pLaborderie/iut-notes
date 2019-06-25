module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    semester: {
      type: DataTypes.ENUM('S1', 'S2', 'S3', 'IPI', 'PEL', 'LP'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  categories.associate = models => {
    categories.hasMany(models.notes);
  }

  return categories;
}