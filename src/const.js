module.exports = {
    P_PROGRAM: 'PROGRAM := EXPRESSION_LIST',

    P_EXPRESSION_LIST_0: 'EXPRESSION_LIST := EXPRESSION',
    P_EXPRESSION_LIST_1: 'EXPRESSION_LIST := EXPRESSION semicolon EXPRESSION_LIST',

    P_EXPRESSION_0: 'EXPRESSION := QUERY_EXPRESSION',
    P_EXPRESSION_1: 'EXPRESSION := UPDATE_EXPRESSION',
    P_EXPRESSION_2: 'EXPRESSION := ',

    P_UPDATE_EXPRESSION_0: 'UPDATE_EXPRESSION := PATH assign QUERY_EXPRESSION',

    P_QUERY_EXPRESSION_0: 'QUERY_EXPRESSION := ATOM_DATA',
    P_QUERY_EXPRESSION_1: 'QUERY_EXPRESSION := variableName',
    P_QUERY_EXPRESSION_2: 'QUERY_EXPRESSION := PATH',
    P_QUERY_EXPRESSION_3: 'QUERY_EXPRESSION := variableName leftBracket rightBracket',
    P_QUERY_EXPRESSION_4: 'QUERY_EXPRESSION := variableName leftBracket QUERY_EXPRESSION_LIST rightBracket',

    P_QUERY_EXPRESSION_LIST_0: 'QUERY_EXPRESSION_LIST := QUERY_EXPRESSION',
    P_QUERY_EXPRESSION_LIST_1: 'QUERY_EXPRESSION_LIST := QUERY_EXPRESSION comma QUERY_EXPRESSION_LIST',

    P_PATH_0: 'PATH := nodeName',
    P_PATH_1: 'PATH := nodeName PATH',

    P_ATOM_DATA_0: 'ATOM_DATA := true',
    P_ATOM_DATA_1: 'ATOM_DATA := false',
    P_ATOM_DATA_2: 'ATOM_DATA := null',
    P_ATOM_DATA_3: 'ATOM_DATA := string',
    P_ATOM_DATA_4: 'ATOM_DATA := number',

    T_ATOM: 'atom',
    T_PATH: 'path',
    T_FUNCTION: 'function',
    T_VARIABLE_NAME: 'variableName',
    T_ASSIGN: 'assign'
};