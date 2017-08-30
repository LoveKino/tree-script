'use strict';

let {
    stringGraph,
    numberGraph
} = require('cl-fsm/apply/json');

let {
    buildFSM
} = require('stream-token-parser');

let FSM = require('cl-fsm');
let {
    stateGraphDSL
} = FSM;

let {
    g,
    c,
    union,
    sequence,
    range,
    circle
} = stateGraphDSL;

let whitespace = union(' ', '\f', '\n', '\r', '\t', '\v', '\u00a0', '\u1680', '\u180e', '\u2000-', '\u200a', '\u2028', '\u2029', '\u202f', '\u205f', '\u3000', '\ufeff');

// .abcbf
// .0
// ._
let nodeName = g(sequence(
    union('.'),
    circle(union('_', range('a', 'z'), range('A', 'Z'), range('0', '9')))
));

let variableName = g(sequence(
    union('_', range('a', 'z'), range('A', 'Z')),
    circle(union('_', range('a', 'z'), range('A', 'Z'), range('0', '9')))
));

module.exports = [

    {
        priority: 1,
        match: 'true',
        name: 'true'
    }, {
        priority: 1,
        match: 'false',
        name: 'false'
    }, {
        priority: 1,
        match: 'null',
        name: 'null'
    }, {
        priority: 1,
        match: buildFSM(stringGraph),
        name: 'string'
    }, {
        priority: 1,
        match: buildFSM(numberGraph),
        name: 'number'
    },

    {
        priority: 1,
        match: buildFSM(nodeName),
        name: 'nodeName'
    },
    {
        priority: 1,
        match: buildFSM(variableName),
        name: 'variableName'
    },
    {
        priority: 1,
        match: '=',
        name: 'assign'
    },
    {
        priority: 1,
        match: '-',
        name: 'delete'
    },
    {
        priority: 1,
        match: ';',
        name: 'semicolon'
    },
    {
        priority: 1,
        match: '(',
        name: 'leftBracket'
    },
    {
        priority: 1,
        match: ')',
        name: 'rightBracket'
    },
    {
        priority: 1,
        match: ',',
        name: 'comma'
    },
    {
        priority: 1,
        match: buildFSM(g(
            c(whitespace)
        )),
        name: 'whitespace'
    }
];
