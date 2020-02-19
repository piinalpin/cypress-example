describe('Student CRUD Test', function() {

	let student = {}
	let editStudent = {}
	
	beforeEach(function() {
		cy.visit('https://fe-flask-rest-api-maverick.herokuapp.com/')
		cy.readFile('cypress/integration/fe-flask-rest-api/student-data.json').its('student').then(value => {
            student = {
            	name: value.name,
            	identityNumber: value.identityNumber
            }
        })

        cy.readFile('cypress/integration/fe-flask-rest-api/student-data.json').its('editStudent').then(value => {
            editStudent = {
            	name: value.name,
            	identityNumber: value.identityNumber
            }
        })
	})

	it('Get List Student', function() {
		cy.get('.nav-link').contains('List Student').click()
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa')
		cy.get('table>thead').should('have', 'tr')
	})

	it('Add New Student', function() {
		cy.get('.nav-link').contains('Add Student').click()
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa/add')
		cy.get('input[id="name"]').type(student.name).should('have.value', student.name)
		cy.get('input[id="nim"]').type(student.identityNumber).should('have.value', student.identityNumber)
		cy.get('button').contains('Submit').click()
		cy.get('button').contains('Yes, save it!').click()
		cy.get('button').contains('OK').click()
		cy.wait(2000)
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa')
		cy.get('table>tbody>tr').eq(0).should('contain', student.name)
	})

	it('Edit Student', function() {
		cy.get('.nav-link').contains('List Student').click()
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa')
		cy.get('button.btn.btn-warning.btn-secondary').children('i').should('have.class', 'fa-pencil').click()
		cy.get('input[id="name"]').clear().type(editStudent.name).clear().type(editStudent.name).should('have.value', editStudent.name)
		cy.get('input[id="nim"]').clear().type(editStudent.identityNumber).clear().type(editStudent.identityNumber).should('have.value', editStudent.identityNumber)
		cy.get('button').contains('Submit').click()
		cy.get('button').contains('Yes, save it!').click()
		cy.get('button').contains('OK').click()
		cy.wait(2000)
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa')
		cy.get('table>tbody>tr').eq(0).should('contain', editStudent.name)
	})

	it('Delete Student', function() {
		cy.get('.nav-link').contains('List Student').click()
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa')
		cy.get('button.btn.btn-danger.btn-secondary').children('i').should('have.class', 'fa-trash').click()
		cy.get('button').contains('Yes, save it!').click()
		cy.get('button').contains('OK').click()
		cy.wait(2000)
		cy.url().should('eq', 'https://fe-flask-rest-api-maverick.herokuapp.com/#/mahasiswa')
		cy.get('table>thead').should('have', 'tr')
	})

})