const PostsCategories = (sequelize, _DataTypes) => {
  const PostsCategoriesAtt = sequelize.define('PostsCategories', {},
  { timestamps: false });

  PostsCategoriesAtt.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostsCategoriesAtt,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostsCategoriesAtt,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogposts',
    });
  };

  return PostsCategoriesAtt;
};

module.exports = PostsCategories;