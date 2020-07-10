describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'testuser',
      password: 'testuser'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testuser')
      cy.get('#login-button').click()
      cy.contains('Test user logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Test user logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testuser' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').parent().find('button').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('testurl.com')
      cy.get('#blog-submit-button').click()
      cy.contains('blog added')
      cy.contains('Test title Test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title',
          author: 'Test author',
          url: 'testurl.com'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').parent().find('button').click()
        cy.contains('like').parent().find('button').click()
        cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.contains('successfully liked Test title')
      })

      it('creator can remove it', function () {
        cy.contains('view').parent().find('button').click()
        cy.contains('remove').click()
        cy.contains('Test title was successfully removed')
        cy.get('html').should('not.contain', 'Test title Test author')
      })

      it('but other user can not', function () {
        cy.contains('logout').parent().find('button').click()
        const user2 = {
          name: 'Test user2',
          username: 'testuser2',
          password: 'testuser2'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.visit('http://localhost:3000')
        cy.login({ username: 'testuser2', password: 'testuser2' })
        cy.contains('view').parent().find('button').click()
        cy.get('remove').should('not.exist')
      })
    })

    describe('and three blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title',
          author: 'Test author',
          url: 'testurl.com'
        })
        cy.createBlog({
          title: 'Test title2',
          author: 'Test author',
          url: 'testurl.com'
        })
        cy.createBlog({
          title: 'Test title3',
          author: 'Test author',
          url: 'testurl.com'
        })
        cy.contains('title ').parent().find('button').click()
        cy.contains('like').parent().find('button').click()
        cy.contains('title2').parent().find('button').click()
        cy.contains('title2')
          .parent()
          .contains('like')
          .parent()
          .find('button')
          .click()
          .wait(0)
          .click()
      })
      it('blogs are sorted correctly', function () {
        cy.get('#bloglist').then(($bloglist) => {
          cy.wrap($bloglist).children().first().contains('Test title2')
          cy.wrap($bloglist).children().last().contains('Test title3')
        })
      })
    })
  })
})
