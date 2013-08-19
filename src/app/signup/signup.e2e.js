var util = require('util');

describe('Sign Up', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('/signup');
    });

    xit('should sign up user and redirect to /', function() {
        ptor = protractor.getInstance();

        var timeHack = new Date();
        ptor.findElement(protractor.By.input('user.username')).sendKeys('James' + timeHack.valueOf().toString());
        ptor.findElement(protractor.By.input('user.email')).sendKeys('james.nocentini@gmail.com');
        ptor.findElement(protractor.By.input('user.pass')).sendKeys('narodnaia');
        ptor.findElement(protractor.By.input('user.confirm')).sendKeys('narodnaia');

        ptor.findElement(protractor.By.css('.js-signup')).click();
        ptor.waitForAngular();

        expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/');

    }, 5000);

    xit('should not sign up use and display an error message', function() {
        ptor = protractor.getInstance();

        ptor.findElement(protractor.By.input('user.username')).sendKeys('admin');
        ptor.findElement(protractor.By.input('user.email')).sendKeys('admin@gmail.com');
        ptor.findElement(protractor.By.input('user.pass')).sendKeys('narodnaia');
        ptor.findElement(protractor.By.input('user.confirm')).sendKeys('narodnaia');

        ptor.findElement(protractor.By.css('.js-signup')).click();
        ptor.waitForAngular();

        expect(ptor.findElement(protractor.By.binding('error')).getText()).toEqual('Username already taken')
        expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/signup');



    }, 5000);
});