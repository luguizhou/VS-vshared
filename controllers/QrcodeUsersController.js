var users = require('../models/QrcodeUser.js');
exports.list = function* (params) {
    var result = yield users.list(params);
    return result;
};

exports.add = function *(params) {
    var re = yield users.create(params);
    console.log(re);
    return re;
};

exports.get = function *(params) {
    return yield users.get({ id: params.id });
};

exports.update = function *(params) {
    return yield users.update(params);
};

exports.remove = function *(params) {
    return yield users.remove(params);
};
