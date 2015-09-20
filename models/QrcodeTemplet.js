
var db = require('../redis-db/db');
var qrcodetemplets = db.get('qrcodetemplets');
qrcodetemplets.property('id', {identifier: true});
qrcodetemplets.property('name', {unique: true});
qrcodetemplets.property('phone', {});
qrcodetemplets.property('tel', {});
qrcodetemplets.property('address', {});
qrcodetemplets.property('content', {});


exports.create = function*(params){
    return yield new Promise(function(resolve){
        qrcodetemplets.create(
            {
                name: params.name,
                phone: params.phone,
                tel:params.tel,
                address:params.address,
                content :params.content
            },
            function(err, data){
                var result = {err:err,data:data};
                resolve(result);
            });
    });
};
exports.get = function*(params){
    return yield new Promise(function(resolve){
        qrcodetemplets.get({id:params.id}, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        })
    });
}
exports.list = function*(params) {
    params.direction=params.direction ||"desc";
    return yield new Promise(function(resolve){
        qrcodetemplets.list(params, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        })
    });
};

exports.update=function*(params){
    return yield new Promise(function(resolve){
        qrcodetemplets.update({
            name: params.name,
            phone: params.phone,
            tel:params.tel,
            address:params.address,
            content :params.content
        }, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        });
    });
};

exports.remove=function*(params){
    return yield new Promise(function(resolve){
        qrcodetemplets.remove({
            id: params.id
        }, function(err, data){
            var result = {err:err,data:data};
            console.log(result);
            resolve(result);
        });
    });
};
