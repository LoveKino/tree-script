let {
    checkAST,
    parseStrToAst,
    executeAST
} = require('..');

let assert = require('assert');

describe('exception', () => {
    it('missing variable', (done) => {
        let ast = parseStrToAst('.a.b.c=10;var1');
        try {
            checkAST(ast);
        } catch (err) {
            assert.equal(err.toString(), 'Error: missing variable var1 in []');
            done();
        }
    });

    it('missing variable', (done) => {
        let ast = parseStrToAst('add(.a.b.c, 10)');
        try {
            checkAST(ast, {
                variableStub: {
                    plus: {
                        type: 'function'
                    }
                }
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: missing function add, please check your variable map. Current variable map has keys [plus].');
            done();
        }
    });

    it('wrong type', (done) => {
        let ast = parseStrToAst('plus(.a.b.c, 10)');
        try {
            let variableStub = {
                plus: {
                    type: 'function'
                }
            };
            checkAST(ast, {
                variableStub
            });
            executeAST(ast, {
                variableStub,
                variableMap: {
                    plus: 10
                }
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: variable plus is not function as expected, please check your variable map. Current variable map has keys [plus].');
            done();
        }
    });

    it('missing in runtime', (done) => {
        let ast = parseStrToAst('plus(.a.b.c, 10)');
        try {
            let variableStub = {
                plus: {
                    type: 'function'
                }
            };
            checkAST(ast, {
                variableStub
            });
            executeAST(ast, {
                variableStub
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: missing variable plus in variableMap whick keys are [].');
            done();
        }
    });
});
