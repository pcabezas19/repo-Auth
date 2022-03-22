import { forgot, randomPass } from '../../fixtures/happyPathData';

/// <reference types="cypress" />

describe('Tests for Password of ms-auth', () => {
    let tokenId = '';
    let tokenDesc = '';

    //Happy path for Forgot request
    it('Forgot request', () => {
        cy.request('POST', `${Cypress.env('64025')}/password/forgot`, forgot)
            .then(response => {
                expect(response.status).equal(200);
                expect(response.body.message).equal('Ok');

            });
    });

    //Happy path for Validate request
    it('Validate request', () => {
        cy.request('GET', `${Cypress.env('64004')}/tokens?order=id-desc`)
            .as('beforeRequest');
        cy.get('@beforeRequest').then(response => {
            expect(response.status).equal(200);

            tokenId = response.body[0].id;
            tokenDesc = response.body[0].description;

            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/password/validate`,
                body: {
                    'idPlatform': 2,
                    'email': 'pcabezas@steplix.com',
                    'metadata': {
                        'idToken': tokenId,
                        'token': tokenDesc
                    }
                }

            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.id).not.to.be.null;
                expect(response.body.id_platform).to.be.within(1, 3);
                expect(response.body.metadata).not.to.be.null;
            });
        });
    });

    //Happy path for Recover request
    it('Recover request', () => {
        cy.request('GET', `${Cypress.env('64004')}/tokens?order=id-desc`)
            .as('beforeRequest');
        cy.get('@beforeRequest').then(response => {
            expect(response.status).equal(200);
            tokenId = response.body[0].id;
            tokenDesc = response.body[0].description;
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/password/recover`,
                body: {
                    'idPlatform': 2,
                    'idToken': tokenId,
                    'token': tokenDesc,
                    'idform': 10004,
                    'password': randomPass,
                    'payload': {},
                    'ignoreCaptcha': true
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.message).equal('Ok');

            });
        });
    });

    //Invalid Email test
    it('Forgot invalid Email', () => {
        cy.fixture('userNotFound.json').then(notFound => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/password/forgot`,
                failOnStatusCode: false,
                body: notFound
            }).then(response => {
                expect(response.status).equal(404);
            });
        });
    });

});