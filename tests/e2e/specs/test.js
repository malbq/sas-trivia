const delay = 2 * 180 // 2 * transition duration
var selCatName, selCatId, catsLength
describe('Trivia', () => {
  it('Start', () => {
    cy.visit('/')
    cy.contains('h1', 'SAS Trivia')
  })
  it('Profiles', () => {
    cy.get('.content h2').contains('Who are you?')
    cy.get('.profiles-list').find('li').should(($lis) => {
      expect($lis.length).to.be.gte(1)
    }).last().find('.profile').should('have.class', 'profile-new')
    cy.get('.profiles-new-form').should('not.be.visible')
    cy.get('.profile-new').click()
    cy.get('.profiles-new-form').should('be.visible')
    cy.get('body').click(1, 1)
    cy.get('.profiles-new-form').should('not.be.visible')
    cy.get('.profile-new').click()
    cy.get('body').type('{esc}')
    cy.get('.profiles-new-form').should('not.be.visible')
    cy.get('.profile-new').click()
    cy.get('.profiles-new-form input').type('Name{enter}')
    cy.get('.profile').last().parent().prev().contains('Name').click()
  })
  it('Categories', () => {
    cy.wait(delay)
    cy.get('.content h2').contains('Categories')
    cy.get('.category').should($cats => {
      catsLength = $cats.length
      selCatId = Math.floor(Math.random() * catsLength)
      const $cat = $cats.eq(selCatId)
      selCatName = $cat.text()
      $cat.click()
    })
  })
  it('Question', () => {
    cy.wait(delay)
    cy.get('.question-category').contains(selCatName)
    cy.get('.content h2').contains('Question 1')
    cy.get('.question-difficulty-medium')

    // test two wrong

    cy.get('.question-answer').contains('Wrong').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-wrong')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 2')

    cy.get('.question-answer').contains('Wrong').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-wrong')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 3')

    cy.get('.question-difficulty-easy')

    // test two right

    cy.get('.question-answer').contains('Correct').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-right')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 4')
    
    cy.get('.question-answer').contains('Correct').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-right')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 5')
    
    cy.get('.question-difficulty-medium')
    
    // two more right
    
    cy.get('.question-answer').contains('Correct').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-right')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 6')
    
    cy.get('.question-answer').contains('Correct').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-right')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 7')
    
    cy.get('.question-difficulty-hard')
    
    // two more wrong
    
    cy.get('.question-answer').contains('Wrong').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-wrong')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 8')
    
    cy.get('.question-answer').contains('Wrong').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-wrong')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 9')

    cy.get('.question-difficulty-medium')

    // answer the remaining

    cy.get('.question-answer').contains('Correct').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-right')
    .find('button').click().should('not.be.visible')
    cy.get('.content h2').contains('Question 10')
    
    cy.get('.question-answer').contains('Correct').click().should('have.class', 'selected')
    cy.get('.question-send button').click()
    cy.get('.question-sent').should('be.visible').and('have.class', 'question-right')
    .find('button').click()
  })
  it('Result', () => {
    cy.wait(delay)
    cy.get('.result-numbers-rights .result-numbers-general-value').contains('6')
    cy.get('.result-numbers-wrongs .result-numbers-general-value').contains('4')
    cy.get('.result-numbers-detail-set').should($details => {
      expect($details.eq(0).children('div').eq(1).text()).to.equal('Right: 2')
      expect($details.eq(0).children('div').eq(2).text()).to.equal('Wrong: 0')
      expect($details.eq(1).children('div').eq(1).text()).to.equal('Right: 4')
      expect($details.eq(1).children('div').eq(2).text()).to.equal('Wrong: 2')
      expect($details.eq(2).children('div').eq(1).text()).to.equal('Right: 0')
      expect($details.eq(2).children('div').eq(2).text()).to.equal('Wrong: 2')
    })
    cy.get('.result-numbers button').click()
  })
  it('Controls', () => {
    cy.wait(delay)
    cy.get('.content h2').contains('Categories')
    cy.get('.category').contains(selCatName).click()
    cy.wait(delay)
    cy.get('.result-numbers button').click()
    cy.wait(delay)
    cy.get('.category').eq(selCatId < catsLength-1 ? selCatId + 1 : 0).click()
    cy.wait(delay)
    cy.get('.content header .close').click()
    cy.wait(delay)
    cy.get('.content h2').contains('Categories')
  })
})
