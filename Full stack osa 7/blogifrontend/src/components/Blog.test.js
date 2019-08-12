import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent,cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

afterEach(cleanup)
describe('<SimpleBlog/>', () => {
  test('renders content', () => {
    const blog = {
      title: 'Blog for test',
      author: 'Dijamg',
      likes: 30
    }
    const component = render(
      <SimpleBlog blog={blog}/>
    )

    expect(component.container).toHaveTextContent('Blog for test')
    expect(component.container).toHaveTextContent('Dijamg')
    expect(component.container).toHaveTextContent('30')

  })

  test('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'Blog for test',
      author: 'Dijamg',
      likes: 30
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button =  getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

describe('<Blog/>', () => {
  test('Blog shows only title and the author by default', () => {
    const blog = {
      title: 'Blog for test',
      author: 'Dijamg',
      url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
      user: 'abcdefg'
    }

    const mockHandler = jest.fn()
    const currentUser = {
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthbGxlMTIzIiwiaWQiOiI1ZDI3Mjg2NTA2ZGQ4ZDFlYzA4ZTA3NWUiLCJpYXQiOjE1NjI4Njc1NTl9.qME8HtVT7MGgdn74PbxHwKXM5a5x1cn9C3w9-1CEGJ0',
      username:'kalle123',
      name:'kalle'
    }
    const component = render(
      <Blog
        blog={blog}
        handleDelete={mockHandler}
        handleLike={mockHandler}
        currentUser = {currentUser}
      />
    )

    //Should exist
    const element = component.getByText(
      'Blog for test Dijamg'
    )
    //Should be null
    const info = component.container.querySelector('.info')

    expect(element).toBeDefined()
    expect(info).toBeNull()

  })

  test('Clicking name of blog reveals all information', () => {
    const blog = {
      title: 'Blog for test',
      author: 'Dijamg',
      url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
      user: 'abcdefg'
    }

    const mockHandler = jest.fn()
    const currentUser = {
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthbGxlMTIzIiwiaWQiOiI1ZDI3Mjg2NTA2ZGQ4ZDFlYzA4ZTA3NWUiLCJpYXQiOjE1NjI4Njc1NTl9.qME8HtVT7MGgdn74PbxHwKXM5a5x1cn9C3w9-1CEGJ0',
      username:'kalle123',
      name:'kalle'
    }
    const component = render(
      <Blog
        blog={blog}
        handleDelete={mockHandler}
        handleLike={mockHandler}
        currentUser = {currentUser}
      />
    )

    const button = component.getByText('Blog for test Dijamg')

    fireEvent.click(button)

    const info = component.container.querySelector('.info')

    expect(info).toBeDefined()
    expect(component.container).toHaveTextContent('Blog for test')
    expect(component.container).toHaveTextContent('Dijamg')
    expect(component.container).toHaveTextContent('https://fullstackopen.com/osa5/react_sovellusten_testaaminen')
    expect(component.container).toHaveTextContent('likes')
    expect(component.container).toHaveTextContent('like')

  })
})