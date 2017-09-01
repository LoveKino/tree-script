'use strict';


// TODO reuse pfc-compiler

let {
    isObject,
    isFunction,
    isString
} = require('./util');

let {
    T_ASSIGN,
    T_DELETE,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_PATH,
    T_NODE_NAME_VARIABLE,

    A_DEFAULT
} = require('./const');

/**
 *
 * variableStub = {
 *    [variableName]: {
 *       type,
 *       default,  // default value of variable
 *       validate // function used to check dynamic
 *    }
 * }
 *
 *
 * TODO restraints checking
 */

// static check
let checkAST = (ast, {
    variableStub = {}
} = {}) => {
    let open = ast.slice(0);

    while (open.length) {
        let top = open.pop();
        let midType = top.type;

        if (midType === T_VARIABLE_NAME) {
            let varName = top.value;
            // must exist
            if (!variableStub.hasOwnProperty(varName)) {
                throw new Error(`missing variable ${varName} in [${Object.keys(variableStub).join(', ')}]`);
            }
        } else if (midType === T_FUNCTION) { // function
            let {
                funName,
                params
            } = top.value;
            let stub = variableStub[funName];
            if (!isObject(stub) || stub.type !== T_FUNCTION) {
                throw new Error(`missing function ${funName}, please check your variable map. Current variable map has keys [${Object.keys(variableStub).join(', ')}].`);
            }
            // push params
            let paramLen = params.length;
            for (let i = 0; i < paramLen; i++) {
                open.push(params[i]);
            }
        } else if (midType === T_ASSIGN) {
            open.push(top.value.path);
            open.push(top.value.value);
        } else if (midType === T_DELETE) {
            open.push(top.value.path);
        } else if (midType === T_PATH) {
            let path = top.value;
            for (let i = 0; i < path.length; i++) {
                let {
                    type,
                    value
                } = path[i];
                if (type === T_NODE_NAME_VARIABLE) {
                    let stub = variableStub[value];

                    if (!isObject(stub) || stub.type !== T_NODE_NAME_VARIABLE) {
                        throw new Error(`missing type attribute ${T_NODE_NAME_VARIABLE} for ${value}, please check your variable map. Current variable map has keys [${Object.keys(variableStub).join(', ')}].`);
                    }
                }
            }
        }
    }
};

let runTimeCheck = (variableStub, variableMap) => {
    for (let name in variableStub) {
        let stub = variableStub[name];
        // missing check
        if (!variableMap.hasOwnProperty(name) && !stub.hasOwnProperty(A_DEFAULT)) {
            throw new Error(`missing variable ${name} in variableMap whick keys are [${Object.keys(variableMap).join(', ')}].`);
        }

        // type match
        if (stub.type === T_FUNCTION && !isFunction(variableMap[name])) {
            throw new Error(`variable ${name} is not function as expected, please check your variable map. Current variable map has keys [${Object.keys(variableMap).join(', ')}].`);
        }

        if (stub.type === T_NODE_NAME_VARIABLE && !isString(variableMap[name])) {
            throw new Error(`variable ${name} is not string as expected, please check your variable map. Current variable map has keys [${Object.keys(variableMap).join(', ')}].`);
        }
    }
};

let getVariable = (name, variableMap, variableStub) => {
    let stub = variableStub[name] || {};
    let value = null;
    if (variableMap.hasOwnProperty(name)) {
        value = variableMap[name];
    } else {
        // try to using default
        if (!stub.hasOwnProperty(A_DEFAULT)) {
            throw new Error(`missing variable ${name}.`);
        } else {
            value = stub[A_DEFAULT];
        }
    }

    if (isObject(stub) && isFunction(stub.validate)) { // dynamic validation
        stub.validate(value);
    }

    return value;
};

module.exports = {
    checkAST,
    runTimeCheck,
    getVariable
};
