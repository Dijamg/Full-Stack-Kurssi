const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

  test('right amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('returned blogs have an id field', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    
    ids.forEach(id => expect(id).toBeDefined())
  })

  test('HTTP Post will add a new blog', async () =>{
      const newBlog ={
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDnb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain(
          "Canonical string reduction"
          )      

  })

  test('blog has 0 likes if likes is not given', async () =>{
    const newBlog ={
        id: "5a422b3a1b54a676231d17f9",
        title: "No likes",
        author: "Me",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog).expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDnb()
        const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
        expect(addedBlog.likes).toBe(0)
  })

  test('Returns 400 bad request if title is missing', async () =>{
    const newBlog ={
        id: "5a422b3a1b54a676231d17f9",
        author: "Me",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

     const blogsAtEnd = await helper.blogsInDnb()
     expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('Returns 400 bad request if url is missing', async () =>{
    const newBlog ={
        id: "5a422b3a1b54a676231d17f9",
        author: "Me",
        title: "No url",
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd =await helper.blogsInDnb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })
    
    test('User with no username is not added', async () =>{
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name:"qwerty",
        password:"password"
      }
      const resp = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)

      const text = `{"error":"User validation failed: username: Path ${"`".concat("username").concat("`")} is required."}`
      expect(resp.text).toBe(text)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    
    test('user with too short username is not added', async () =>{
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username:"ab",
        name:"qwerty",
        password:"password"
      }
      const resp = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)

      const text = `{"error":"User validation failed: username: Path ${"`".concat("username").concat("`")} (${"`".concat("ab").concat("`")}) is shorter than the minimum allowed length (3)."}`
      expect(resp.text).toBe(text)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user with no password is not added', async () =>{
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username:"abcd",
        name:"qwerty"
      }
      const resp = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)

      const text = `{"error":"Password is required and it needs to be atleast 3 letters."}`
      expect(resp.text).toBe(text)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user with too short password is not added', async () =>{
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username:"abcd",
        name:"qwerty",
        password:"ab"
      }
      const resp = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)

      const text = `{"error":"Password is required and it needs to be atleast 3 letters."}`
      expect(resp.text).toBe(text)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
  

  afterAll(() => {
    mongoose.connection.close()
  }) 
