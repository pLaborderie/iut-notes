module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.STRING,
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

  notes.associate = models => {
    notes.belongsTo(models.users, { as: 'author' });
    notes.belongsTo(models.categories);
  };

  return notes;
}