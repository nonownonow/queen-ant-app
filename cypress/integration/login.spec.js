describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.viewport(360, 760)
  })

  it('로그인 페이지가 정상적으로 로딩 된다. - 로그인 버튼 확인 가능', () => {
    cy.get('.login-btn')
  })

  it('아이디와 패스워드를 입력후 로그인 버튼을 클릭한다.', () => {
    cy.get('input[id=email]')
      .type('tester')
      .should('have.value', 'tester')
    cy.get('input[id=password]')
      .type('1234')
      .should('have.value', '1234')
    cy.get('.login-btn').click()
  })

  //   it('it focuses the input', () => {
  //     cy.focused().should(
  //       'have.class',
  //       'toteTransfer__input toteTransfer__input--before',
  //     )
  //   })

  //   it('accept input, click button and show tote list', () => {
  //     const input = 'T001'
  //     cy.get('.toteTransfer__input--before')
  //       .type(input)
  //       .should('have.value', input)

  //     cy.get('.toteTransfer__button--before').click()
  //   })
})
