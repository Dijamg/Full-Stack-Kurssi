const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) =>{
    if(blogs.length === 0){
        return 0
    }else{
      const sum = blogs.map(blog => blog.likes).reduce((a,b)=>a+b,0)
      return sum
    }
}

const favoriteBlog = (blogs) =>{
    const copy = [].concat(blogs)
    copy.sort(function(a,b){return b.likes - a.likes})
    const favBlog = {
        title: copy[0].title,
        author: copy[0].author,
        likes: copy[0].likes
    }
    return favBlog
}

const mostBlogs = (blogs) => {
    const copy = [].concat(blogs)
    const names = copy.map(blog => blog.author)
    const m = new Map()
    for(x of names){
        if(!Array.from(m.keys).includes(x)){
            m.set(x,0)
        }
    }
    for(x of names){
        m.set(x, (m.get(x)+1))
    }
    const keys = [...m.keys()]
    const values = [...m.values()]
    const index = values.indexOf(Math.max(...values))
    return {
        author: keys[index],
        blogs: values[index]
    }
}

const mostLikes = (blogs) => {
    const copy = [].concat(blogs)
    const names = copy.map(blog => blog.author)
    const m = new Map()
    for(x of names){
        if(!Array.from(m.keys).includes(x)){
            m.set(x,0)
        }
    }
    for(x of blogs){
        m.set(x.author, (m.get(x.author)+ x.likes))
    }
    const keys = [...m.keys()]
    const values = [...m.values()]
    const index = values.indexOf(Math.max(...values))
    return {
        author: keys[index],
        likes: values[index]
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

  