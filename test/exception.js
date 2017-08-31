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
        let ast = parseStrToAst('- .a ; plus(.a.b.c, 10)');
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

    it('assert in runtime', (done) => {
        let ast = parseStrToAst('.a.b=num');
        try {
            let variableStub = {
                num: {
                    assert: (v) => {
                        if (v < 10) {
                            throw new Error('num must less than 10');
                        }
                    }
                }
            };
            checkAST(ast, {
                variableStub
            });

            executeAST(ast, {
                variableStub,
                variableMap: {
                    num: 3
                }
            });

            executeAST(ast, {
                variableStub,
                variableMap: {
                    num: 12
                }
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: num must less than 10');
            done();
        }
    });

    it('', (done) => {
        let ast = parseStrToAst('.a.[ma]');
        try {
            let variableStub = {
                ma: {
                    type: 'function'
                }
            };
            checkAST(ast, {
                variableStub
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: missing type attribute nodeNameVariable for ma, please check your variable map. Current variable map has keys [ma].');
            done();
        }
    });

    it('', (done) => {
        let ast = parseStrToAst('.a.[ma]');
        try {
            let variableStub = {
                ma: {
                    type: 'nodeNameVariable'
                }
            };
            checkAST(ast, {
                variableStub
            });

            executeAST(ast, {
                variableStub,
                variableMap: {
                    ma: 1
                }
            });
        } catch (err) {
            assert.equal(err.toString(), 'Error: variable ma is not string as expected, please check your variable map. Current variable map has keys [ma].');
            done();
        }
    });
});
