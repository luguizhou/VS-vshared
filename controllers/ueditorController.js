//var templets = require('../models/QrcodeTemplet.js');
var fs = require("fs");
var path = require('path');
var fse = require('fs-extra');
var os = require('os');
exports.ue_list = function* (static_url,list_dir) {

    return yield new Promise(function(resolve){
        var str = '';
        var i = 0;
        var list = [];
        fs.readdir(static_url + list_dir, function(err, files) {
            if (err) throw err;

            var total = files.length;
            files.forEach(function(file) {

                var filetype = 'jpg,png,gif,ico,bmp';
                var tmplist = file.split('.');
                var _filetype = tmplist[tmplist.length - 1];
                if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
                    var temp = {};
                    if (list_dir === '/') {
                        temp.url = list_dir + file;
                    } else {
                        temp.url = list_dir + "/" + file;
                    }
                    list[i] = (temp);
                } else {}
                i++;
                // send file name string when all files was processed
                if (i === total) {
                    resolve( {
                        "state": "SUCCESS",
                        "list": list,
                        "start": 1,
                        "total": total
                    });
                }
            });
        });
    });

};

exports.ue_up = function* (static_url,img_url) {

    return yield new Promise(function(resolve){
        var tmpdir = path.join(os.tmpDir(), path.basename(filename));
        var name = snowflake.nextId() + path.extname(tmpdir);
        var dest = path.join(static_url, img_url, name);

        file.pipe(fs.createWriteStream(tmpdir));
        fse.move(tmpdir, dest, function(err) {
            if (err) throw err;
            resolve({
                'url': path.join(img_url, name),
                'title': req.body.pictitle,
                'original': filename,
                'state': 'SUCCESS'
            });
        });
    });

};

