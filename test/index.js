'use strict';

let {
    parseStrToAst,
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
},{
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
        result
    }) => {
        name = name || code;
        it(name, () => {
            let tree = JsonTree(data);

            let value = executeAST(parseStrToAst(code), {
                queryByPath: tree.queryByPath,
                setByPath: tree.setByPath,
                variableMap
            });

            assert.deepEqual(value, result);
        });
    });
});
