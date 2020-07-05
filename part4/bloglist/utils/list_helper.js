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
  }
  const maxLikes =  Math.max.apply(Math, blogs.map(function(blog){return blog.likes}))
  const maxBlogObject =  blogs.find(blog => blog.likes === maxLikes)
  const favouriteBlog = { 'title': maxBlogObject.title,
    'author':maxBlogObject.author,
    'likes':maxBlogObject.likes }
  return favouriteBlog

}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      'author': '',
      'blogs': 0
    }
  }
  const blogCounts = {}
  blogs.forEach(blog => {
    const author = blog.author
    Object.prototype.hasOwnProperty.call(blogCounts, author) ? blogCounts[author]++ : blogCounts[author] = 1
  })
  const authorWithMostBlogs = Object.keys(blogCounts).reduce((a, b) => blogCounts[a] > blogCounts[b] ? a : b)
  return {
    'author': authorWithMostBlogs,
    'blogs': blogCounts[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      'author': '',
      'likes': 0
    }
  }
  const likeCounts = {}
  blogs.forEach(blog => {
    const author = blog.author
    Object.prototype.hasOwnProperty.call(likeCounts, author) ? likeCounts[author]+=blog.likes : likeCounts[author] = blog.likes
  })
  const authorWithMostBlogs = Object.keys(likeCounts).reduce((a, b) => likeCounts[a] > likeCounts[b] ? a : b)
  return {
    'author': authorWithMostBlogs,
    'likes': likeCounts[authorWithMostBlogs]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
