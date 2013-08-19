var util = require('util');

describe('Log in', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('/login');
    });

    xit('should login user and redirect to /', function() {
        ptor = protractor.getInstance();

        ptor.findElement(protractor.By.input('user.username')).sendKeys('admin');
        ptor.findElement(protractor.By.input('user.pass')).sendKeys('pass');
        ptor.findElement(protractor.By.css('.js-login')).click();
        ptor.waitForAngular();
        expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/');

    }, 5000);

    xit('should not log in user and display an error message', function() {
        ptor = protractor.getInstance();

        ptor.findElement(protractor.By.input('user.username')).sendKeys('admin');
        ptor.findElement(protractor.By.input('user.pass')).sendKeys('narodnaia');
        ptor.findElement(protractor.By.css('.js-login')).click();
        ptor.waitForAngular();
        expect(ptor.findElement(protractor.By.binding('error')).getText()).toEqual('Wrong password')
        expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/login');

        ptor.findElement(protractor.By.input('user.username')).sendKeys('anonymous');
        ptor.findElement(protractor.By.css('.js-login')).click();
        ptor.waitForAngular();
        expect(ptor.findElement(protractor.By.binding('error')).getText()).toEqual('Sorry, this username was not found')
        expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/login');

    }, 5000);
});