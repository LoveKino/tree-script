'use strict';

const parser = require('./parser');
const {
    checkAST,
    runTimeCheck,
    getVariable
} = require('./stub');

const {
    T_CONDITION,
    T_ATOM,
    T_PATH,
    T_ASSIGN,
    T_DELETE,
    T_APPEND,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_NODE_NAME,
    T_NODE_NAME_VARIABLE,
    T_EXPRESSION_LIST
} = require('./const');

const executeAST = (ast, {
    queryByPath,
    setByPath,
    removeByPath,
    appendByPath,
    variableMap = {},
    variableStub = {},
    skipCheck = false
}) => {
    // TODO check params
    // check variableStub

    if (!skipCheck) {
        runTimeCheck(variableStub, variableMap);
    }

    let open = [{
        node: ast,
        visited: false
    }];
    let valueStack = [];

    while (open.length) {
        let top = open[open.length - 1];
        let topNode = top.node;

        if (topNode.type === T_EXPRESSION_LIST) {
            if (top.visited) {
                // get value from value stack
                let expValues = [];
                for (let i = 0; i < topNode.value.length; i++) {
                    expValues.unshift(valueStack.pop());
                }
                valueStack.push(expValues[expValues.length - 1]);
                open.pop();
            } else {
                top.visited = true;
                for (let i = topNode.value.length - 1; i >= 0; i--) {
                    open.push({
                        node: topNode.value[i],
                        visited: false
                    });
                }
            }
        } else if (topNode.type === T_CONDITION) {
            const {
                condition,
                branch1,
                branch2
            } = topNode.value;
            // resolve condition and then decide to run which branch
            if (top.visited === false) {
                top.visited = 'condition';
                open.push({
                    node: condition,
                    visited: false
                });
            } else if (top.visited === 'condition') {
                top.visited = 'branch';
                const conditionRet = valueStack.pop();
                if (conditionRet) {
                    open.push({
                        node: branch1,
                        visited: false
                    });
                } else {
                    open.push({
                        node: branch2,
                        visited: false
                    });
                }
            } else if (top.visited === 'branch') {
                open.pop();
            }
        } else if (topNode.type === T_ATOM) {
            valueStack.push(topNode.value);
            open.pop();
        } else if (topNode.type === T_VARIABLE_NAME) { // pickup variable
            let variableName = topNode.value;
            let variableValue = getVariable(variableName, variableMap, variableStub);
            valueStack.push(variableValue);
            open.pop();
        } else if (topNode.type === T_PATH) {
            valueStack.push(queryByPath(resolvePath(topNode.value, variableMap)));
            open.pop();
        } else if (topNode.type === T_FUNCTION) {
            let {
                funName,
                params
            } = topNode.value;

            if (top.visited) {
                // get value from value stack
                let paramValues = [];
                for (let i = 0; i < params.length; i++) {
                    paramValues.push(valueStack.pop());
                }
                // TODO missing funName as function exception
                valueStack.push(variableMap[funName](...paramValues));
                open.pop();
            } else {
                top.visited = true;
                for (let i = 0; i < params.length; i++) {
                    open.push({
                        node: params[i],
                        visited: false
                    });
                }
            }
        } else if (topNode.type === T_ASSIGN) {
            let {
                path,
                value
            } = topNode.value;

            if (top.visited) {
                let assignValue = valueStack.pop();
                valueStack.push(setByPath(resolvePath(path.value, variableMap), assignValue));
                open.pop();
            } else {
                top.visited = true;
                open.push({
                    node: value,
                    visited: false
                });
            }
        } else if (topNode.type === T_DELETE) {
            let {
                path
            } = topNode.value;

            valueStack.push(removeByPath(resolvePath(path.value, variableMap)));
            open.pop();
        } else if (topNode.type === T_APPEND) {
            let {
                path,
                value
            } = topNode.value;

            if (top.visited) {
                let assignValue = valueStack.pop();
                valueStack.push(appendByPath(resolvePath(path.value, variableMap), assignValue));
                open.pop();
            } else {
                top.visited = true;
                open.push({
                    node: value,
                    visited: false
                });
            }
        }
    }

    return valueStack[valueStack.length - 1];
};

let resolvePath = (path, variableMap) => {
    let ret = [];
    for (let i = 0; i < path.length; i++) {
        let {
            type,
            value
        } = path[i];
        if (type === T_NODE_NAME) {
            ret.push(value);
        } else if (type === T_NODE_NAME_VARIABLE) {
            ret.push(variableMap[value]);
        }
    }

    return ret;
};

let parseStrToAst = (str) => {
    let handleChunk = parser();
    if (str) {
        handleChunk(str);
    }
    return handleChunk(null);
};

module.exports = {
    parser,
    parseStrToAst,
    executeAST,
    checkAST
};
