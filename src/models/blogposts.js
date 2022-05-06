const BlogPost = (sequelize, DataTypes) => {
  const BlogPostsAtt = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATEONLY,
    updated: DataTypes.DATEONLY,
    userId: { type: DataTypes.INTEGER, foreingKey: true },
  }, {
    timestamps: false,
    tablename: 'BlogPosts',
  });

  BlogPostsAtt.associate = (models) => {
    BlogPostsAtt.belongsTo(models.User, { foreingKey: 'userId', as: 'user' });
  };
  return BlogPostsAtt;
};

module.exports = BlogPost;