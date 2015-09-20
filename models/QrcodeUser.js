
var db = require('../redis-db/db');
var qrcodeusers = db.get('qrcodeusers');
qrcodeusers.property('id', {identifier: true});
qrcodeusers.property('name', {unique: true});
qrcodeusers.property('phone', {});
qrcodeusers.property('tel', {});
qrcodeusers.property('address', {});
qrcodeusers.property('templetid', {});


exports.create = function*(params){
    return yield new Promise(function(resolve){
        qrcodeusers.create(
            {
                name: params.name,
                phone: params.phone,
                tel:params.tel,
                address:params.address,
                templetid :params.templetid
            },
            function(err, data){
                var result = {err:err,data:data};
                resolve(result);
            });
    });
};
exports.get = function*(params){
    return yield new Promise(function(resolve){
        qrcodeusers.get({id:params.id}, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        })
    });
}
exports.list = function*(params) {
    params.direction=params.direction ||"desc";
    return yield new Promise(function(resolve){
        qrcodeusers.list(params, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        })
    });
};

exports.update=function*(params){
    return yield new Promise(function(resolve){
        qrcodeusers.update({
            name: params.name,
            phone: params.phone,
            tel:params.tel,
            address:params.address,
            templetid :params.templetid
        }, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        });
    });
};

exports.remove=function*(params){
    return yield new Promise(function(resolve){
        qrcodeusers.remove({
            id: params.id
        }, function(err, data){
            var result = {err:err,data:data};
            console.log(result);
            resolve(result);
        });
    });
};
