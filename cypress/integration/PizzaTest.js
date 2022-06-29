describe('All tests', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/')
    })

    const nameBox = () => cy.get('input[id=name-input]')
    const sizeList = () => cy.get('select[name = size]')
    const bbqsauce = ()=> cy.get('input[name=sauce]')
    const submitBttn = () => cy.get('button[id=order-button]')
    const toppings = () => cy.get('input[name=toppings]')


    describe('Input boxes',()=>{
        it('Pizza Button goes to pizza page',()=>{
            cy.get('button[id=order-pizza]').click()
            cy.url().should('include','/pizza')
        })
        it('Multiple toppings selected',()=>{
            cy.get('button[id=order-pizza]').click()
            toppings().check()
        })
        it('Form can be submitted',()=>{
            cy.get('button[id=order-pizza]').click()
            nameBox().type('Eric')
            nameBox().should('have.value', 'Eric')
            sizeList().select('Large')
            bbqsauce().check()
            toppings().check()
            submitBttn().should('not.be.disabled')
        })
       
    })
})