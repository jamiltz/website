var util = require('util');

describe('Adjunct List', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('/signup');
    });

    it('should do something', function() {
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

    xit('should do something', function() {
        ptor = protractor.getInstance();





    }, 5000);
});