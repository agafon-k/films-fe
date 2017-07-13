var chai = require('chai');
var assert = require('assert');
var appView = require('../js/views/app.view');

describe('App View', function () {
    appView.render();

    it('should ', function () {
       this.$el.should.be('html');
    });
});

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });

        it('should return 0 when the value is first', function() {
            assert.equal(0, [1,2,3].indexOf(1));
        });
    });
});