
/// <reference types="cypress" />

describe('Tests for Devices', () => {
    let bearerToken = '';
    let descript = '';


    //Happy path Verify request
    it('Verify request', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('64030')}/tokens`,
            body: {
                'idType': 1,
                'metadata': {
                    'sub': 1,
                    'idPlatform': 1
                }
            },
        }).then(response => {
            expect(response.status).equal(200);
        }).then(response => {
            bearerToken = response.body.access_token;
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/device/verify`,
                auth: {
                    bearer: bearerToken,
                },
                body: {
                    'hash': 'ME5P',
                    'metadata': {
                        'prefix': 'Hola Prueba',
                        'hash': 'ME5P',
                        'country': 'AR'
                    },
                    'idChannel': 6
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.message).equal('Ok');
            });
        });
    });

    //Happy path Activate request
    it('Activate request', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('64025')}/login`,
            body: {
                'idPlatform': 2,
                'payload': {
                    'email': 'prueba1@steplix.com',
                    'password': 'MiContraseña123!'
                },
                'ignoreCaptcha': true
            }
        }).then(response => {
            expect(response.status).equal(200);
            bearerToken = response.body.token.access_token;
            cy.request({
                method: 'GET',
                url: `${Cypress.env('64004')}/tokens?order=id-desc`,
            }).then(response => {
                expect(response.status).equal(200);
                descript = response.body[0].description;
                cy.request({
                    method: 'POST',
                    url: `${Cypress.env('64025')}/device/activate`,
                    auth: {
                        bearer: bearerToken,
                    },
                    body: {
                        'telephone': '+5491124030838',
                        'token': descript
                    }
                }).then(response => {
                    expect(response.status).equal(200);
                    expect(response.body.id).not.to.be.null;
                    expect(response.body.metadata.id_group).to.be.within(100, 104);
                    expect(response.body.token.refresh_token).not.to.be.null;
                    expect(response.body.token.access_token).not.to.be.null;
                });
            });
        });
    });
});