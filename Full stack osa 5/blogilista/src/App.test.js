import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    //Should not exist.
    const blogs = component.container.querySelectorAll('.blog')

    //Should exist.
    const loginForm = component.container.querySelector('.loginForm')

    expect(loginForm).toBeDefined()
    expect(blogs.length).toBe(0)
    expect(component.container).toHaveTextContent('Login')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
    expect(component.container).toHaveTextContent('login')
  })

  test('blogs are rendered when user has logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('log out')
    )
    const blogs = component.container.querySelectorAll('.blog')
    const loginForm = component.container.querySelector('.loginForm')
    const createForm = component.container.querySelector('.createForm')

    expect(loginForm).toBeNull()
    expect(createForm).toBeDefined()
    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).toHaveTextContent(
      'Canonical string reduction'
    )
  })
})