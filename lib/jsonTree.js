'use strict';

module.exports = (jsonData) => {
    return {
        queryByPath: (path) => {
            let cur = jsonData;
            for (let i = 0; i < path.length; i++) {
                if (!isObject(cur)) {
                    return undefined;
                } else {
                    cur = cur[path[i]];
                }
            }

            return cur;
        },

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
        }
    };
};

let isObject = v => v && typeof v === 'object';
