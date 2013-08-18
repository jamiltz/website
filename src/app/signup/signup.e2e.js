var util = require('util');

describe('Adjunct List', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('/signup');
    });

    it('should do something', function() {
        ptor = protractor.getInstance();

        ptor.findElement(protractor.By.input('user.username')).sendKeys('Jamesssss');
        ptor.findElement(protractor.By.input('user.email')).sendKeys('james.nocentini@gmail.com');



    }, 5000);

    it('should do something', function() {
        ptor = protractor.getInstance();


        ptor.findElement(protractor.By.input('user.password')).sendKeys('narodnaia');
        ptor.findElement(protractor.By.input('user.confirm')).sendKeys('narodnaia');


    }, 5000);
});