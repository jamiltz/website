describe('Item', function() {
    describe('get specific item', function() {
        var httpBackend;
        var Item;

        beforeEach(module('bk-service-item'));
        beforeEach(function() {
            inject(function($httpBackend, _Item_) {
                httpBackend= $httpBackend;
                Item= _Item_;
            });
        });

        it('should return a list of items', function() {
            var returnData = {
                status: 200,
                item: { name: 'History Book',
                    price: '£ 20',
                    pictures:
                        [ 'https://benkyet.s3-eu-west-1.amazonaws.com/test/1377078995795.jpg',
                            'https://benkyet.s3-eu-west-1.amazonaws.com/test/1377078995829.jpg' ],
                    seller_id: '520e6a9dca9324a4c6c8f68e',
                    ref: 10,
                    _id: '52148ed4ff793a6715000001' }
            };

            httpBackend.expectGET('/1.0/item/10').respond(returnData);
            var test = {
                handler: function() {}
            };
            spyOn(test, 'handler');
            var returnedPromise = Item.getItem(10);
            returnedPromise.then(test.handler);
            httpBackend.flush();
            expect(test.handler).toHaveBeenCalledWith(returnData);
        })
    })
})