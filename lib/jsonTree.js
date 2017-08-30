'use strict';

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

    return {
        queryByPath,

        setByPath: (path, value) => {
            let parent = jsonData;
            if (!isObject(parent)) return false;
            if (!path.length) return false;

            for (let i = 0; i < path.length - 1; i++) {
                let part = path[i];
                let next = parent[part];
                if (!isObject(next)) { // if is not object, just override to a empty object
                    next = {};
                    parent[part] = next;
                }
                parent = next;
            }

            parent[path[path.length - 1]] = value;
            return true;
        },

        removeByPath: (path) => {
            let parentPath = path.slice(0, path.length - 1);
            let lastKey = path[path.length - 1];
            let parent = queryByPath(parentPath);
            if (parent === undefined || !isObject(parent) || !parent.hasOwnProperty(lastKey)) {
                return {
                    opResult: false,
                    message: 'try to remove none-existed node'
                };
            } else {
                delete parent[lastKey];
                return {
                    opResult: true
                };
            }
        }
    };
};

let isObject = v => v && typeof v === 'object';
