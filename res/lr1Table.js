module.exports={"GOTO":[{"PROGRAM":8,"EXPRESSION_LIST":9,"EXPRESSION":10,"UPDATE_EXPRESSION":11,"QUERY_EXPRESSION":12,"PATH":13,"ATOM_DATA":14},{},{"PATH":16},{},{},{},{},{},{},{},{},{},{},{},{},{"QUERY_EXPRESSION":27,"QUERY_EXPRESSION_LIST":28,"PATH":29,"ATOM_DATA":30},{},{"EXPRESSION_LIST":31,"EXPRESSION":10,"UPDATE_EXPRESSION":11,"QUERY_EXPRESSION":12,"PATH":13,"ATOM_DATA":14},{"QUERY_EXPRESSION":33,"PATH":34,"ATOM_DATA":14},{},{},{"PATH":36},{},{},{},{},{},{},{},{},{},{},{"PATH":39},{},{},{"QUERY_EXPRESSION":27,"QUERY_EXPRESSION_LIST":41,"PATH":29,"ATOM_DATA":30},{},{"QUERY_EXPRESSION":27,"QUERY_EXPRESSION_LIST":42,"PATH":29,"ATOM_DATA":30},{},{},{},{},{},{}],"ACTION":[{"$":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"variableName":{"type":"shift","state":1},"true":{"type":"shift","state":3},"false":{"type":"shift","state":4},"null":{"type":"shift","state":5},"string":{"type":"shift","state":6},"number":{"type":"shift","state":7},"nodeName":{"type":"shift","state":2}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":15}},{"$":{"type":"reduce","production":["PATH",["nodeName"]]},"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":2}},{"$":{"type":"reduce","production":["ATOM_DATA",["true"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["false"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["null"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["string"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["number"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"$":{"type":"accept"}},{"$":{"type":"reduce","production":["PROGRAM",["EXPRESSION_LIST"]]}},{"$":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION"]]},"semicolon":{"type":"shift","state":17}},{"$":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]}},{"$":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"assign":{"type":"shift","state":18}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"rightBracket":{"type":"shift","state":20},"variableName":{"type":"shift","state":19},"true":{"type":"shift","state":22},"false":{"type":"shift","state":23},"null":{"type":"shift","state":24},"string":{"type":"shift","state":25},"number":{"type":"shift","state":26},"nodeName":{"type":"shift","state":21}},{"$":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"$":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"variableName":{"type":"shift","state":1},"true":{"type":"shift","state":3},"false":{"type":"shift","state":4},"null":{"type":"shift","state":5},"string":{"type":"shift","state":6},"number":{"type":"shift","state":7},"nodeName":{"type":"shift","state":2}},{"variableName":{"type":"shift","state":1},"true":{"type":"shift","state":3},"false":{"type":"shift","state":4},"null":{"type":"shift","state":5},"string":{"type":"shift","state":6},"number":{"type":"shift","state":7},"nodeName":{"type":"shift","state":32}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":35}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"comma":{"type":"reduce","production":["PATH",["nodeName"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":21}},{"comma":{"type":"reduce","production":["ATOM_DATA",["true"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["false"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["null"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["string"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["number"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION_LIST",["QUERY_EXPRESSION"]]},"comma":{"type":"shift","state":37}},{"rightBracket":{"type":"shift","state":38}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"$":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION","semicolon","EXPRESSION_LIST"]]}},{"$":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":32}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"rightBracket":{"type":"shift","state":40},"variableName":{"type":"shift","state":19},"true":{"type":"shift","state":22},"false":{"type":"shift","state":23},"null":{"type":"shift","state":24},"string":{"type":"shift","state":25},"number":{"type":"shift","state":26},"nodeName":{"type":"shift","state":21}},{"comma":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"variableName":{"type":"shift","state":19},"true":{"type":"shift","state":22},"false":{"type":"shift","state":23},"null":{"type":"shift","state":24},"string":{"type":"shift","state":25},"number":{"type":"shift","state":26},"nodeName":{"type":"shift","state":21}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}},{"$":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"rightBracket":{"type":"shift","state":43}},{"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION_LIST",["QUERY_EXPRESSION","comma","QUERY_EXPRESSION_LIST"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}}]}