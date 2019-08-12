/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'tester123',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('user can login', function () {
    cy.get('#username')
      .type('tester123')
    cy.get('#password')
      .type('salainen')
    cy.contains('login')
      .click()
    cy.contains('Tester logged in')
  })

  it('wrong credentials wont let you login', function () {
    cy.get('#username')
      .type('tester123')
    cy.get('#password')
      .type('wrong')
    cy.contains('login')
      .click()
    cy.contains('Login')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('tester123')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
    })

    it('name of the user is show', function(){
      cy.contains('Tester logged in')
    })

    it('user can add a blog', function(){
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('React Patterns')
      cy.get('#author')
        .type('Michael Chan')
      cy.get('#url')
        .type('https://reactpatterns.com/')
      cy.get('[data-cy=create]')
        .click()
      cy.contains('React Patterns by Michael Chan')
    })

    describe('when there is a blog', function(){
      beforeEach(function() {
        cy.contains('new blog')
          .click()
        cy.get('#title')
          .type('React Patterns')
        cy.get('#author')
          .type('Michael Chan')
        cy.get('#url')
          .type('https://reactpatterns.com/')
        cy.get('[data-cy=create]')
          .click()
      })
      it('blog view can be opened', function(){
        cy.get('[data-cy=linkToBlog]')
          .click()
        cy.contains('Comments')
      })

      it('a comment can be added', function(){
        cy.get('[data-cy=linkToBlog]')
          .click()
        cy.get('#comment')
          .type('Good one!')
        cy.contains('add comment')
          .click()
        cy.contains('Good one!')
      })

      it('user can navigate using navigation bar', function(){
        cy.contains('users')
          .click()
        cy.contains('Blogs created')
        cy.contains('blogs')
          .click()
        cy.contains('new blog')
      })
    })

  })
})
