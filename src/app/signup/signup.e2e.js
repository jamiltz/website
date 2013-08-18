var util = require('util');

describe('Adjunct List', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('/signup');
    });

    it('should do something', function() {
        ptor = protractor.getInstance();

        ptor.findElement(protractor.By.input('user.username')).sendKeys('James');
        ptor.findElement(protractor.By.input('user.email')).sendKeys('james.nocentini@gmail.com');
        ptor.findElement(protractor.By.input('user.password')).sendKeys('narodnaia');
        ptor.findElement(protractor.By.input('user.confirm')).sendKeys('narodnaia');

        ptor.findElement(protractor.By.css('.js-signup')).click();
        ptor.waitForAngular();

    }, 5000);

    it('should do something', function() {
        ptor = protractor.getInstance();





    }, 5000);
});