import { form, forms, formSingle } from '../fixtures/happyPathData';


/// <reference types="cypress" />

describe('Ms Auth', () => {
    const registerRoute = 'person,person.emails,person.addresses,person.telephones,person.devices';

    //Route health
    it('Health', () => {
        cy.request('GET', `${Cypress.env('64025')}/health`)
            .as('validRequest');
        cy.get('@validRequest').then(response => {
            expect(response.status).equal(200);
        });
    });

    //Happy Path for single Register (person idType = 1)
    it('Register', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('64025')}/register`,
            body: formSingle,
            qs: {
                tiny: false,
                with: registerRoute
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body.id).not.to.be.null;
            expect(response.body.metadata.id_group).to.be.within(100, 104);
            expect(response.body.status.id).to.be.within(1, 6);
            expect(response.body.platform.id).not.to.be.null;
            expect(response.body.person.id).not.to.be.null;
        });
    });

    //Happy Path for Register Full User (person idType = 2)
    it('Register Full User', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('64025')}/register`,
            body: form,
            qs: {
                tiny: false,
                with: registerRoute
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body.person.id).is.not.null;
            expect(response.body.person.emails[0].description).equal(form.person.emails[0].email);
            expect(response.body.person.telephones[0].description).equal(form.person.telephones[0].telephone);
        });
    });

    //Happy Path of the route Login
    it('Login', () => {
        cy.request('POST', `${Cypress.env('64025')}/login`, forms)
            .then(response => {
                expect(response.status).equal(200);
                expect(response.body.id).to.be.exist;
                expect(response.body.token.refresh_token).is.not.null;
                expect(response.body.token.access_token).is.not.null;

            });
    });

    //******************************************** EDGE CASES *******************************************************


    //Invalid Person idType
    it('Register Full User Invalid Person ', () => {
        cy.fixture('negativePersonType.json').then(invalidPersonT => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/register`,
                failOnStatusCode: false,
                body: invalidPersonT,
                qs: {
                    tiny: false,
                    with: registerRoute
                }
            }).then(response => {
                expect(response.status).equal(404);

            });
        });
    });

    //Invalid Email idType
    it('Register Full User Invalid Emails idType', () => {
        cy.fixture('negativeEmailsType.json').then(invalidEmailT => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/register`,
                failOnStatusCode: false,
                body: invalidEmailT,
                qs: {
                    tiny: false,
                    with: registerRoute
                }
            }).then(response => {
                expect(response.status).equal(404);

            });
        });
    });

    //Invalid Devices
    it('Register Full User Invalid Devices', () => {
        cy.fixture('negativeDevicesPlatform.json').then(invalidDevice => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/register`,
                failOnStatusCode: false,
                body: invalidDevice,
                qs: {
                    tiny: false,
                    with: registerRoute
                }
            }).then(response => {
                expect(response.status).equal(404);

            });
        });
    });

    //Invalid Telephones
    it('Register Full User Invalid Telephones', () => {
        cy.fixture('negativeTelephones.json').then(invalidPhone => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/register`,
                failOnStatusCode: false,
                body: invalidPhone,
                qs: {
                    tiny: false,
                    with: registerRoute
                }
            }).then(response => {
                expect(response.status).equal(400);

            });
        });
    });

    //Invalid document
    it('Register Full User Invalid documents', () => {
        cy.fixture('negativeDocuments.json').then(invalidDoc => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('64025')}/register`,
                failOnStatusCode: false,
                body: invalidDoc,
                qs: {
                    tiny: false,
                    with: registerRoute
                }
            }).then(response => {
                expect(response.status).equal(404);

            });
        });
    });

    /* Tests for Logout and Activate User are not included yet... */

});