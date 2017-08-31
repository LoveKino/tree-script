'use strict';

let uuidv4 = require('uuid/v4');

let autoId = () => {
    let time = new Date().getTime(); // used to sort by time
    // generate id
    return `_gid_${time}_${uuidv4().replace(/-/g, '_')}`;
};

let isObject = v => v && typeof v === 'object';

const O_T_MODIFY = 'update';
const O_T_REMOVE = 'delete';
const T_SUCCESS = 'success';

const ERR_T_REMOVE_NONE_EXIST = 'remove_none_exist';

let modifySuccess = (path, value) => {
    return {
        operationType: O_T_MODIFY,
        resultType: T_SUCCESS,

        path,
        value: value && value.toString()
    };
};

let removeNoneExist = (path) => {
    return {
        operationType: O_T_REMOVE,
        resultType: ERR_T_REMOVE_NONE_EXIST,

        path
    };
};

let removeSuccess = (path) => {
    return {
        operationType: O_T_REMOVE,
        resultType: T_SUCCESS,

        path
    };
};

module.exports = {
    autoId,
    isObject,

    modifySuccess,
    removeNoneExist,
    removeSuccess
};
