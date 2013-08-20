ddescribe('List', function() {
    describe('get list of items', function() {
        var httpBackend;
        var List;

        beforeEach(module('bk-service-list'));
        beforeEach(function() {
            inject(function($httpBackend, _List_) {
                httpBackend = $httpBackend;
                List = _List_;
            });
        });

        it('should return a list of items', function() {
            var returnData = {
                status: 200,
                items: [ { name: 'History Book',
                    price: '£ 20',
                    pictures:
                        [ 'https://benkyet.s3-eu-west-1.amazonaws.com/test/1376995607570.jpg',
                            'https://benkyet.s3-eu-west-1.amazonaws.com/test/1376995607572.jpg' ],
                    seller_id: '520e6a9dca9324a4c6c8f68e',
                    _id: '52134918d274877c09000002' },
                    { name: 'History Book',
                        price: '£ 20',
                        pictures:
                            [ 'https://benkyet.s3-eu-west-1.amazonaws.com/test/1377010678277.jpg',
                                'https://benkyet.s3-eu-west-1.amazonaws.com/test/1377010678331.jpg' ],
                        seller_id: '520e6a9dca9324a4c6c8f68e',
                        _id: '521383f655ff746410000001' } ]
            };

            httpBackend.expectGET('/1.0/items').respond(returnData);
            var test = {
                handler: function() {}
            };
            spyOn(test, 'handler');
            var returnedPromise = List.all();
            returnedPromise.then(test.handler);
            httpBackend.flush();
            expect(test.handler).toHaveBeenCalledWith(returnData);
        })
    })
})