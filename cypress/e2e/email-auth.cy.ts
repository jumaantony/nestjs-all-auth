describe('Email Repository API', () => {
	
	describe('When a user submits invalid login credentials', () => {
		it('should return a 400', () => {
			const email = 'example@mail.com';
			const password = 'password';

			cy.intercept('POST', '/email/signin').as('signin');

			cy.request({
				method: 'POST',
				url: '/email/signin',
				failOnStatusCode: false, // Prevent Cypress from treating non-2xx as failures
				body: {
					email: email,
					password: password,
				},
			}).then((response) => {
				expect(response.status).to.equal(400);
				expect(response.body.message).to.equal('Invalid login credentials');
			});
		});
	});

	describe('When a user tries to login yet the email has not been confirmed', () => {
		it('should return a 400', () => {
			const email = Cypress.env('email1');
			const password = Cypress.env('password');


			cy.intercept('POST', '/email/signin').as('signin');

			cy.request({
				method: 'POST',
				url: '/email/signin',
				failOnStatusCode: false, // Prevent Cypress from treating non-2xx as failures
				body: {
					email: email,
					password: password,
				},
			}).then((response) => {
				expect(response.status).to.equal(400);
				expect(response.body.message).to.equal('Email not confirmed');
			});
		});
	});

	describe('When a user submits valid login credentials', () => {
		it('should return a 200 and sigin a user', () => {
			const email = Cypress.env('email2');
			const password = Cypress.env('password');

			cy.intercept('POST', '/email/signin').as('signin');

			cy.request({
				method: 'POST',
				url: '/email/signin',
				failOnStatusCode: false,
				body: {
					email: email,
					password: password,
				},
			}).then((response) => {
				expect(response.status).to.equal(201);
			});
		});
	});
	
});
