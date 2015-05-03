var Checker = require('../../../lib/checker');
var assert = require('assert');

describe('rules/require-template-strings', function() {
    var checker;

    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
        checker.configure({ esnext: true, requireTemplateStrings: true });
    });

    it('should report the use of string concatenation with a identifier on the left', function() {
        assert(checker.checkString('a + "a"').getErrorCount() === 1);
    });

    it('should report the use of string concatenation with a identifier on the right', function() {
        assert(checker.checkString('"a" + a').getErrorCount() === 1);
    });

    it('should not report the use of string concatenation with a identifier on the left and right', function() {
        assert(checker.checkString('a + a').isEmpty());
    });

    it('should not report the use of string concatenation with two literals', function() {
        assert(checker.checkString('"a" + "a"').isEmpty());
    });

    it('should not report the use of template strings', function() {
        assert(checker.checkString('`How are you, ${name}?`').isEmpty());
    });
});
