const Category = (sequelize, DataTypes) => {
  const CategoryAtt = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tablename: 'Categories',
  });

  return CategoryAtt;
};

module.exports = Category;