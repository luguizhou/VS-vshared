var templets = require('../models/QrcodeTemplet.js');
exports.list = function* (params) {
    var result = yield templets.list(params);
    return result;
};

exports.add = function *(params) {
    var re = yield templets.create(params);
    console.log(re);
    return re;
};

exports.get = function *(params) {
    return yield templets.get({ id: params.id });
};

exports.update = function *(params) {
    return yield templets.update(params);
};

exports.remove = function *(params) {
    return yield templets.remove(params);
};
