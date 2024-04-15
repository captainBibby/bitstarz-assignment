import { test, expect } from '@playwright/test';
import {data} from '../resourses/functions';
import { faker } from '@faker-js/faker/locale/en';
import envVars from '../resourses/envVars';

let signUpemail = faker.internet.email({firstName: '88', lastName: 'qwsd'});
let faq1Text= envVars.FAQ_1;
let faq2Text= envVars.FAQ_2;
let faq3Text= envVars.FAQ_3;

let faq1TitleText = envVars.FAQ_1_TITLE;
let faq2TitleText = envVars.FAQ_2_TITLE;
let faq3TitleText = envVars.FAQ_3_TITLE;

exports.checkoutPage = class checkoutPage {

    constructor(page) {
        this.page = page
            this.signUpBTN = page.getByRole('button', { name: 'Sign Up', exact: true });
            this.emailField = page.getByPlaceholder('Enter your email');
            this.bitStarzContinueBTN = page.getByRole('button', { name: 'Continue' });
            this.createUserNameField = page.getByPlaceholder('Create username');
            this.createPassword = page.getByPlaceholder('Password');
            this.setCurrencyPage = page.getByText('Set currency');
            this.currencyUSD = page.getByText('USD', { exact: true });
            this.confirmCTA = page.getByRole('button', { name: 'Confirm' });
            this.noBonus = page.getByRole('link', { name: 'No, I don\'t want any bonuses' });
            this.userHover = page.locator('.header-user-dropdown__hover');
            this.logOutCTA = page.getByText('Log Out');
            //login section
            this.logInBTN = page.getByRole('button', { name: 'Log In' })
            this.logInEmailField = page.locator('#signUpLoginForm');
            this.passwordField = page.locator('input[name="password"]');
            this.logInBTNModal = page.locator('#modal-login-form').getByRole('button', { name: 'Log In' });
            this.depositBTN = page.getByRole('button', { name: 'Deposit' });
            //logout section
            this.userHover = page.locator('.header-user-dropdown__hover');
            this.logOutBTN = page.getByText('Log Out');
            //FAQ section
            this.searchBar = page.getByPlaceholder('Find game or game studio (try');
            this.pickGame = page.getByRole('link', { name: 'BGaming Elvis Frog TRUEWAYS' });
            this.search = page.locator('#header section').getByRole('img');
            this.outOfFunds = page.getByText('Out of funds');
            this.jpMania = page.getByRole('button', { name: 'How to win' });
            this.faq = page.getByRole('heading', { name: 'faq' });
            this.faq1 = page.locator('#jackpot-mania-faq-section div').filter({ hasText: 'How to participate?' }).nth(3);
            this.faq1content = page.getByText('It couldn\'t be more simple.');
            this.faq2 = page.locator('#jackpot-mania-faq-section div').filter({ hasText: 'What is Jackpotz Mania?' }).nth(3);
            this.faq2content = page.getByText('Jackpotz Mania is an original');
            this.faq3 = page.locator('#jackpot-mania-faq-section div').filter({ hasText: 'I\'ve lost my ACTIVE status.' }).nth(3);
            this.faq3content = page.getByText('No worries, the JPM statuses');
    }

    async navigateToBitStarz() {
        await this.page.goto(data.homePage);
        await expect(this.signUpBTN).toBeVisible();        
    }

    async signUp(){
        await this.signUpBTN.click();
        await expect(this.emailField).toBeVisible;
        await this.emailField.type(signUpemail);
        await this.bitStarzContinueBTN.click();
        await expect(this.createUserNameField).toBeVisible();
        await this.createUserNameField.type(data.logincredentials.userName);
        await this.bitStarzContinueBTN.click();
        await expect(this.createPassword).toBeVisible();
        await this.createPassword.type(data.logincredentials.password);
        await this.bitStarzContinueBTN.click();
        await expect(this.setCurrencyPage).toBeVisible();
        await this.currencyUSD.click();
        await this.confirmCTA.click();
        await expect(this.noBonus).toBeVisible();
        await this.noBonus.click();
        await this.userHover.hover();
        await expect(this.logOutCTA).toBeVisible();
    }

    async logIn(){
        await this.logInBTN.click();
        await expect(this.logInEmailField).toBeVisible;
        await this.logInEmailField.type(data.logincredentials.email, { delay: 100 }); //delay to avoid capcha service error
        await this.passwordField.type (data.logincredentials.password, { delay: 100 });
        await this.logInBTNModal.click();
        await expect(this.depositBTN).toBeVisible();
    }

    async logOut(){
        await this.userHover.hover();
        await this.logOutBTN.click();
        await expect(this.signUpBTN).toBeVisible();
    }

       async searchGame() {
        await expect(this.searchBar).toBeVisible();
        await this.searchBar.click();       
        await this.searchBar.type(data.searchGame, { delay: 300 });
        await expect(this.pickGame).toBeVisible(); 
        await this.pickGame.click();
        await expect(this.outOfFunds).toBeVisible();
    }

    async FAQ() {
        await this.page.goto(data.homePage);
        await this.jpMania.click();
        await expect(this.faq).toBeVisible(); 
        await this.faq1.click();
        // Get the inner text of the element
        let faq1Title = await this.faq1.innerText();
        let faq1Content = await this.faq1content.innerText();
        // Check if the faq1Content contains the expected text
        expect(faq1Content).toContain(faq1Text) && (faq1Title).toContain(faq1TitleText);
        await this.faq2.click();
        let faq2Title = await this.faq2.innerText();
        let faq2Content = await this.faq2content.innerText();
        expect(faq2Content).toContain(faq2Text) && (faq2Title).toContain(faq2TitleText);
        await this.faq3.click();
        let faq3Title = await this.faq3.innerText();
        let faq3Content = await this.faq3content.innerText();
        expect(faq3Content).toContain(faq3Text) && (faq3Title).toContain(faq3TitleText);
    }

}