const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return { 'title': '',
      'author':'',
      'likes':'' }
  } else {
    const maxLikes =  Math.max.apply(Math, blogs.map(function(blog){return blog.likes}))
    const maxBlogObject =  blogs.find(blog => blog.likes === maxLikes)
    const favouriteBlog = { 'title': maxBlogObject.title,
      'author':maxBlogObject.author,
      'likes':maxBlogObject.likes }
    return favouriteBlog
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
