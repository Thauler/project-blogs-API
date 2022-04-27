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

  return UserAtt;
};

module.exports = User;