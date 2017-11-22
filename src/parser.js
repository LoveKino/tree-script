'use strict';

const streamTokenSpliter = require('stream-token-parser');
const {
    LR
} = require('syntaxer');
const {
    getProductionId,
    processTokens,
} = require('./util');
const tokenTypes = require('../grammer/tokenTypes');
const {
    ACTION,
    GOTO
} = require('../res/lr1Table');

const {
    P_PROGRAM,

    P_EXPRESSION_LIST_0,
    P_EXPRESSION_LIST_1,

    P_EXPRESSION_0,
    P_EXPRESSION_1,
    P_EXPRESSION_2,
    P_EXPRESSION_3,
    P_EXPRESSION_4,

    P_CONDITION_EXPRESSION,

    P_UPDATE_EXPRESSION_0,
    P_UPDATE_EXPRESSION_1,
    P_UPDATE_EXPRESSION_2,

    P_QUERY_EXPRESSION_0,
    P_QUERY_EXPRESSION_1,
    P_QUERY_EXPRESSION_2,
    P_QUERY_EXPRESSION_3,
    P_QUERY_EXPRESSION_4,

    P_QUERY_EXPRESSION_LIST_0,
    P_QUERY_EXPRESSION_LIST_1,

    P_PATH_0,
    P_PATH_1,
    P_PATH_2,
    P_PATH_3,

    P_ATOM_DATA_0,
    P_ATOM_DATA_1,
    P_ATOM_DATA_2,
    P_ATOM_DATA_3,
    P_ATOM_DATA_4,

    T_EXPRESSION_LIST,
    T_CONDITION,
    T_ATOM,
    T_PATH,
    T_ASSIGN,
    T_DELETE,
    T_APPEND,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_NODE_NAME,
    T_NODE_NAME_VARIABLE
} = require('./const');

module.exports = () => {
    let tokenSpliter = streamTokenSpliter.parser(tokenTypes);

    // TODO optimization AST
    let lrParse = LR(ACTION, GOTO, {
        // when reduce prodcution, translate at the sametime
        reduceHandler: (production, midNode) => {
            switch (getProductionId(production)) {
                case P_PROGRAM:
                    midNode.value = {
                        type: T_EXPRESSION_LIST,
                        value: midNode.children[0].value
                    };
                    break;

                case P_EXPRESSION_LIST_0:
                    midNode.value = midNode.children[0].value === null ? [] : [midNode.children[0].value];
                    break;

                case P_EXPRESSION_LIST_1:
                    midNode.value = (midNode.children[0].value === null ? [] : [midNode.children[0].value]).concat(midNode.children[2].value);
                    break;

                case P_EXPRESSION_0:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_1:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_2: // empty situation
                    midNode.value = null;
                    break;

                case P_EXPRESSION_3: // {program}
                    midNode.value = midNode.children[1].value;
                    break;
                case P_EXPRESSION_4:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_CONDITION_EXPRESSION:
                    midNode.value = {
                        type: T_CONDITION,
                        value: {
                            condition: midNode.children[0].value,
                            branch1: midNode.children[2].value,
                            branch2: midNode.children[4].value
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_0:
                    midNode.value = {
                        type: T_ASSIGN,
                        value: {
                            path: midNode.children[0].value,
                            value: midNode.children[2].value
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_1:
                    midNode.value = {
                        type: T_DELETE,
                        value: {
                            path: midNode.children[1].value,
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_2:
                    midNode.value = {
                        type: T_APPEND,
                        value: {
                            path: midNode.children[1].value,
                            value: midNode.children[3].value
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_0:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_QUERY_EXPRESSION_1:
                    midNode.value = {
                        type: T_VARIABLE_NAME,
                        value: midNode.children[0].token.text
                    };
                    break;

                case P_QUERY_EXPRESSION_2:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_QUERY_EXPRESSION_3:
                    midNode.value = {
                        type: T_FUNCTION,
                        value: {
                            funName: midNode.children[0].token.text,
                            params: []
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_4:
                    midNode.value = {
                        type: 'function',
                        value: {
                            funName: midNode.children[0].token.text,
                            params: midNode.children[2].value
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_LIST_0:
                    midNode.value = [midNode.children[0].value];
                    break;

                case P_QUERY_EXPRESSION_LIST_1:
                    midNode.value = [midNode.children[0].value].concat(midNode.children[2].value);
                    break;

                case P_PATH_0:
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME,
                            value: midNode.children[0].token.text.substring(1)
                        }]
                    };
                    break;

                case P_PATH_1:
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME,
                            value: midNode.children[0].token.text.substring(1)
                        }].concat(midNode.children[1].value.value)
                    };
                    break;

                case P_PATH_2:
                    var nodeNameVarTxt = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME_VARIABLE,
                            value: nodeNameVarTxt.substring(2, nodeNameVarTxt.length - 1).trim()
                        }]
                    };
                    break;

                case P_PATH_3:
                    var nodeNameVarTxt2 = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME_VARIABLE,
                            value: nodeNameVarTxt2.substring(2, nodeNameVarTxt2.length - 1).trim()
                        }].concat(midNode.children[1].value.value)
                    };
                    break;

                case P_ATOM_DATA_0:
                    midNode.value = {
                        type: T_ATOM,
                        value: true
                    };
                    break;

                case P_ATOM_DATA_1:
                    midNode.value = {
                        type: T_ATOM,
                        value: false
                    };
                    break;

                case P_ATOM_DATA_2:
                    midNode.value = {
                        type: T_ATOM,
                        value: null
                    };
                    break;

                case P_ATOM_DATA_3:
                    var text = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_ATOM,
                        value: JSON.parse(text)
                    };
                    break;

                case P_ATOM_DATA_4:
                    var numText = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_ATOM,
                        value: Number(numText)
                    };
                    break;
            }
        }
    });

    // handle chunk data
    return (chunk) => {
        let str = chunk && chunk.toString();
        let tokens = processTokens(tokenSpliter(str));

        for (let i = 0; i < tokens.length; i++) {
            lrParse(tokens[i]);
        }

        // means finished chunks
        if (chunk === null) {
            let ast = lrParse(null);
            return ast.children[0].value;
        }
    };
};
