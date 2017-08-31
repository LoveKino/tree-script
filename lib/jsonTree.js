'use strict';

let {
    autoId,
    isObject,

    modifySuccess,
    removeNoneExist,
    removeSuccess
} = require('./util');

module.exports = (jsonData, {
    missingValue = undefined
} = {}) => {
    let queryByPath = (path) => {
        let cur = jsonData;
        for (let i = 0; i < path.length; i++) {
            if (!isObject(cur)) {
                return missingValue;
            } else {
                if (cur.hasOwnProperty(path[i])) {
                    cur = cur[path[i]];
                } else {
                    return missingValue;
                }
            }
        }

        return cur;
    };

    let setByPath = (path, value) => {
        let parent = jsonData;

        for (let i = 0; i < path.length - 1; i++) {
            let part = path[i];
            let next = parent[part];
            if (!isObject(next)) { // if is not object, just override to a empty object
                next = {}; // create a new middle node
                parent[part] = next;
            }
            parent = next;
        }

        parent[path[path.length - 1]] = value; // set value
        return modifySuccess(path, value);
    };

    return {
        queryByPath,

        setByPath,

        removeByPath: (path) => {
            let parentPath = path.slice(0, path.length - 1);
            let lastKey = path[path.length - 1];
            let parent = queryByPath(parentPath);
            if (parent === missingValue || !isObject(parent) || !parent.hasOwnProperty(lastKey)) {
                return removeNoneExist(path);
            } else {
                delete parent[lastKey];
                return removeSuccess(path);
            }
        },

        appendByPath: (path, value) => {
            return setByPath(path.concat([autoId()]), value);
        }
    };
};
