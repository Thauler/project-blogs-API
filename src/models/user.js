const User = (sequelize, DataTypes) => {
  const UserAtt = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tablename: 'Users',
  });

  UserAtt.associate = (models) => {
    UserAtt.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blogposts',
    });
  };

  return UserAtt;
};

module.exports = User;