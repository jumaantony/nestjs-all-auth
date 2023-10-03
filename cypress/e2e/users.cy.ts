describe('Users e2e tests', () => {
	describe('when a user tries to retreive details without a valid token', () => {
		it('should return a 401', () => {
			cy.request({
				method: 'GET',
				url: 'users/user-profile',
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.equal(401);
			});
		});
	})

	describe('when a user has a valid token', () => {
		let token: string;
		const login = (email: string, password: string) => {
			cy.session(['login', email, password], () => {
				cy.request({
					method: 'POST',
					url: '/email/signin',
					failOnStatusCode: false,
					body: {
						email: email,
						password: password,
					},
				}).then(({body}) => {
					token = body.session.access_token
					window.localStorage.setItem('token', token);
				});
			});
		};

		beforeEach(() => {
			const email = Cypress.env('email2');
			const password = Cypress.env('password');
			login(email, password);
		});


		describe('when a user tries to retreive details with a valid token', () => {
			it('should return a 200', () => {
				const token = window.localStorage.getItem('token');
				// console.log(token);
				cy.request({
					method: 'GET',
					url: 'users/all-users',
					failOnStatusCode: false,
					headers: {
						Authorization: `Bearer ${token}`,
						// Authorization: `Bearer ${Cypress.env('token')}`,
					},
				}).then(({body, status}) => {
					console.log(body);
					expect(status).to.equal(200);
					expect(body).to.not.be.null
        			expect(body).to.be.a('array')
				});
			});
		});


	});

});
