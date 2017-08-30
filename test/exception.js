let {
    checkAST,
    parseStrToAst
} = require('..');

let assert = require('assert');

describe('exception', () => {
    it('missing variable', (done) => {
        let ast = parseStrToAst('.a.b.c=10;var1');
        try {
            checkAST(ast);
        } catch (err) {
            assert.equal(err.toString(), 'Error: missing variable var1');
            done();
        }
    });

    it('missing variable', (done) => {
        let ast = parseStrToAst('add(.a.b.c, 10)');
        try {
            checkAST(ast, {
                variableStub: {
                    plus: () => {}
                }
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: missing function add, please check your variable map. Current variable map has keys [plus].');
            done();
        }
    });
});
