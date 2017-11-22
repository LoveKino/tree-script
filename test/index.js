'use strict';

let {
    parseStrToAst,
    checkAST,
    executeAST
} = require('..');

let JsonTree = require('../lib/jsonTree');
let assert = require('assert');

let testData = [{
    code: '"123"',
    result: '123'
}, {
    code: '100',
    result: 100
}, {
    code: 'true',
    result: true
}, {
    code: 'false',
    result: false
}, {
    code: 'null',
    result: null
}, {
    code: '.a.b',
    data: {
        a: {
            b: 4
        }
    },
    result: 4
}, {
    code: '.a',
    data: {
        a: {
            b: 4
        }
    },
    result: {
        b: 4
    }
}, {
    name: 'not exist',
    code: '.a.b',
    result: undefined
}, {
    code: 'var1',
    variableMap: {
        var1: 10
    },
    result: 10
}, {
    code: 'add(.a.b, var1)',
    data: {
        a: {
            b: 13
        }
    },
    variableMap: {
        var1: 10,
        add: (v1, v2) => v1 + v2
    },
    variableStub: {
        var1: {
            type: 'value'
        },
        add: {
            type: 'function'
        }
    },
    result: 23
}, {
    code: '.a.c = 34;.a.c',
    result: 34
}, {
    code: '.a.c = 34;.a.c;',
    result: 34
}, {
    name: 'test semicolon',
    code: ';;;;;',
    result: undefined
}, {
    code: '.a;.b',
    data: {
        a: 1,
        b: 2
    },
    result: 2
}, {
    code: '.a=1;.b=2;add(.a, .b)',
    variableMap: {
        add: (v1, v2) => v1 + v2
    },
    result: 3
}, {
    code: '- .a.b; .a.b',
    data: {
        a: {
            b: [1, 2, 3]
        }
    },
    result: undefined
}, {
    code: 'f()',
    variableMap: {
        f: () => 847
    },
    result: 847
}, {
    name: 'query missing',
    code: '.a.b.c',
    data: {
        a: 10
    },
    result: undefined
}, {
    name: 'default set none obj',
    code: '.a.b.c=10;.a',
    data: {
        a: 7
    },
    result: {
        b: {
            c: 10
        }
    }
}, {
    name: 'try to remove none-existed node',
    code: '- .a.b;',
    result: {
        operationType: 'delete',
        resultType: 'remove_none_exist',
        path: ['a', 'b']
    }
}, {
    name: 'default value for variable in stub',
    code: 'var1',
    variableStub: {
        'var1': {
            default: 10
        }
    },
    result: 10
}, {
    code: '.a.[wh]',
    data: {
        a: {
            b: 22
        }
    },
    variableMap: {
        wh: 'b'
    },
    result: 22
}, {
    name: 'variableInPath',
    code: '.a.[var1].[var2]=26;.a.b.c',
    variableMap: {
        var1: 'b',
        var2: 'c'
    },
    result: 26
}, {
    name: 'append',
    code: '+ .a.b=10;f(.a.b)',
    variableMap: {
        f: (v) => {
            let keys = Object.keys(v);
            assert.equal(keys.length, 1);
            return v[keys[0]];
        }
    },
    result: 10
}, {
    code: '{.a.b}',
    data: {
        a: {
            b: 22
        }
    },
    variableMap: {},
    result: 22
}, {
    code: '{.a.b; .a.c;}',
    data: {
        a: {
            b: 22,
            c: 5
        }
    },
    variableMap: {},
    result: 5
}, {
    code: '.a;{.a.b; .a.c;};.a.d',
    data: {
        a: {
            b: 22,
            c: 5,
            d: 8
        }
    },
    variableMap: {},
    result: 8
}, {
    code: '.a? .b: .c',
    data: {
        a: 1,
        b: 2,
        c: 3
    },
    variableMap: {},
    result: 2
}, {
    code: 'sub(.a)? .b: .c',
    data: {
        a: 1,
        b: 2,
        c: 3
    },
    variableMap: {
        sub: (v) => v - 1
    },
    result: 3
}, {
    name: 'nested condition expression',
    code: '.a ? {.b=0; .b? 5: .c}: 20',
    data: {
        a: 1,
        b: 2,
        c: 3
    },
    variableMap: {},
    result: 3
}, {
    name: 'lazy for condition expression',
    code: '.a? .b=30: .b=20;.b',
    data: {
        a: 1
    },
    variableMap: {},
    result: 30
}, {
    name: 'lazy for condition expression2',
    code: '.a? .b=30: .b=20;.b',
    data: {
        a: 0
    },
    variableMap: {},
    result: 20
}];

describe('index', () => {
    it('base', () => {
        parseStrToAst('.a');
        parseStrToAst('.0');
        parseStrToAst('._');
        parseStrToAst('.A.n.o._');
    });

    testData.forEach(({
        name,
        code,
        data = {},
        variableMap,
        variableStub,
        result
    }) => {
        name = name || code;
        it(name, () => {
            let tree = JsonTree(data);

            let ast = parseStrToAst(code);

            if (variableStub) {
                checkAST(ast, {
                    variableStub
                });
            }

            let value = executeAST(ast, {
                queryByPath: tree.queryByPath,
                setByPath: tree.setByPath,
                removeByPath: tree.removeByPath,
                appendByPath: tree.appendByPath,
                variableMap,
                variableStub
            });

            assert.deepEqual(value, result);
        });
    });
});
