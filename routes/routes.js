var users = require('../controllers/UsersController.js');
var QrcodeUsers = require('../controllers/QrcodeUsersController.js');
var QrcodeTemplets = require('../controllers/QrcodeTempletsController.js');

module.exports = routes;
function routes(router) {


    router.get('/', function*(next) {
        yield this.render("pc/home");
    });
    router.get('/login', function*(next) {
        yield this.render("login");
    });
    router.get('/register', function*(next) {
        yield this.render("register");
    });
    router.post('/login', function*(next) {
       ///this.body = yield users.get(this.request.body);
        if(this.request.body.username=="lugz" &&this.request.body.password=="lugz"){
            yield users.add(this.request.body);
            this.body= {
                err: null,
                data: {
                    token: '80484decceb142dfaf5791c9cb9cd256',
                    username: "卢桂周",
                    uid: 1
                }
            }
        }else{
            this.body={err:"密码不正确",data:null};
        }
        console.log(this.body);
    });
    router.get('/getuser', function*(next) {
        this.body = yield users.get(this.params);
        console.log(this.body);
    });
    router.post('/admin', function*(next) {
        yield this.render("admin/index");
    });
    router.get('/getuserlist/', function*(next) {
        this.body = yield users.list(this.request.body);
    });
    router.post('/userupdate/', function*(next) {
        this.body = yield users.update(this.request.body);
    });
    router.post('/userdelete/', function*(next) {
        this.body = yield users.remove(this.request.body);
    });
    router.post('/create/', function*(next) {
        this.body = yield users.add(this.request.body);
    });
   //后端管理菜单列表
   
   //后端管理二维码菜单
    router.get('/admin/topmenulist', function*(next) {
        this.body = {
            err: null,
            data: [
                {
                    id:1,
                    text: "页面模板管理",
                    menuurl:"qrcode/qcodetempletlist"
                },
                {
                    id:2,
                    text: "用户管理",
                    menuurl:"qrcode/qcodeuserlist"
                }
            ]
        }
    });
    var ueditor = require("ueditor");
    var path = require('path');
    router.all('/ueditor/ue', function*(next) {
        var getParams = this.originalUrl.split('?').length==2?this.originalUrl.split('?')[1]:{};
        for(var i= 0,len=getParams.split('&&').length;i<len;i++){
            var item = getParams.split('&&')[i].split("=");
            this.params[item[0]] = item[1];
        }
        var Busboy = require('busboy');
        var parse = require('co-busboy');
        var snowflake = require('node-snowflake').Snowflake;
        var fs = require("fs");
        //var ue = require("../controllers/ueditorControler.js");
        //this.params = params.split('&');
        if (this.params.action === 'config') {
            this.body={
                "imageActionName": "uploadimage",
                "imageFieldName": "upfile",
                "imageMaxSize": 2048000,
                "imageAllowFiles": [
                    ".png",
                    ".jpg",
                    ".jpeg",
                    ".gif",
                    ".bmp"
                ],
                "imageCompressEnable": true,
                "imageCompressBorder": 1600,
                "imageInsertAlign": "none",
                "imageUrlPrefix": "",
                "imagePathFormat": "/server/ueditor/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                "scrawlActionName": "uploadscrawl",
                "scrawlFieldName": "upfile",
                "scrawlPathFormat": "/server/ueditor/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                "scrawlMaxSize": 2048000,
                "scrawlUrlPrefix": "",
                "scrawlInsertAlign": "none",
                "snapscreenActionName": "uploadimage",
                "snapscreenPathFormat": "/server/ueditor/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                "snapscreenUrlPrefix": "",
                "snapscreenInsertAlign": "none",
                "catcherLocalDomain": [
                    "127.0.0.1",
                    "localhost",
                    "img.baidu.com"
                ],
                "catcherActionName": "catchimage",
                "catcherFieldName": "source",
                "catcherPathFormat": "/server/ueditor/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                "catcherUrlPrefix": "",
                "catcherMaxSize": 2048000,
                "catcherAllowFiles": [
                    ".png",
                    ".jpg",
                    ".jpeg",
                    ".gif",
                    ".bmp"
                ],
                "videoActionName": "uploadvideo",
                "videoFieldName": "upfile",
                "videoPathFormat": "/server/ueditor/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}",
                "videoUrlPrefix": "",
                "videoMaxSize": 102400000,
                "videoAllowFiles": [
                    ".flv",
                    ".swf",
                    ".mkv",
                    ".avi",
                    ".rm",
                    ".rmvb",
                    ".mpeg",
                    ".mpg",
                    ".ogg",
                    ".ogv",
                    ".mov",
                    ".wmv",
                    ".mp4",
                    ".webm",
                    ".mp3",
                    ".wav",
                    ".mid"
                ],
                "fileActionName": "uploadfile",
                "fileFieldName": "upfile",
                "filePathFormat": "/server/ueditor/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}",
                "fileUrlPrefix": "",
                "fileMaxSize": 51200000,
                "fileAllowFiles": [
                    ".png",
                    ".jpg",
                    ".jpeg",
                    ".gif",
                    ".bmp",
                    ".flv",
                    ".swf",
                    ".mkv",
                    ".avi",
                    ".rm",
                    ".rmvb",
                    ".mpeg",
                    ".mpg",
                    ".ogg",
                    ".ogv",
                    ".mov",
                    ".wmv",
                    ".mp4",
                    ".webm",
                    ".mp3",
                    ".wav",
                    ".mid",
                    ".rar",
                    ".zip",
                    ".tar",
                    ".gz",
                    ".7z",
                    ".bz2",
                    ".cab",
                    ".iso",
                    ".doc",
                    ".docx",
                    ".xls",
                    ".xlsx",
                    ".ppt",
                    ".pptx",
                    ".pdf",
                    ".txt",
                    ".md",
                    ".xml"
                ],
                "imageManagerActionName": "listimage",
                "imageManagerListPath": "/server/ueditor/upload/image/",
                "imageManagerListSize": 20,
                "imageManagerUrlPrefix": "",
                "imageManagerInsertAlign": "none",
                "imageManagerAllowFiles": [
                    ".png",
                    ".jpg",
                    ".jpeg",
                    ".gif",
                    ".bmp"
                ],
                "fileManagerActionName": "listfile",
                "fileManagerListPath": "/server/ueditor/upload/file/",
                "fileManagerUrlPrefix": "",
                "fileManagerListSize": 20,
                "fileManagerAllowFiles": [
                    ".png",
                    ".jpg",
                    ".jpeg",
                    ".gif"
                ]
            };
        }
        else if (this.params.action === 'listimage') {
            var ue = require("../controllers/ueditorControler.js");
            var dir_url = '/images/ueditor/';

            this.body =yield ue.ue_list(path.join(__dirname, 'public'),dir_url);


        } else if (this.params.action === 'uploadimage') {
            if (!this.request.is('multipart/*')) return yield next;
            console.log(this.request);
            var img_url = '/images/ueditor/';
            //var tmpdir = path.join(os.tmpDir(), path.basename(filename));
            //var name = snowflake.nextId() + path.extname(tmpdir);
            //var dest = path.join(static_url, img_url, name);
            var parts = parse(this)
            var part
            while (part = yield parts) {
                if (part.length) {
                    // arrays are busboy fields
                    console.log('key: ' + part[0])
                    console.log('value: ' + part[1])
                } else {
                    // otherwise, it's a stream
                    //console.log(path.join(__dirname, '../public')+img_url+'somefile.png');
					var name = snowflake.nextId()+part.filename.substr(part.filename.lastIndexOf('.'));
                    var file = {};
                    file.original = part.filename;
					file.title = part.filename;
                    file.url = path.join(__dirname, '../public')+img_url+name;
                    part.pipe(fs.createWriteStream(file.url));
					file.url = img_url+name;
                    //part.pipe(fs.createWriteStream(tmpdir);
                }
            }
            file.state = 'SUCCESS';
            this.body =file;

                //yield ue.ue_up(path.join(__dirname, 'public'),img_url);
                //callback(req, res, next);
        };
            //this.req.pipe(busboy);

    });

    //二维码模块
	router.get('/qrcode/users/qrcodeimg/:id', function*(next) {
		var qrCode = require('qrcode-npm');
		var qr = qrCode.qrcode(4, 'M');
		qr.addData('http://qrcode.vshared.top/qrcode/users/qrcodeuserpage/'+this.request.ctx.params.id);
		qr.make();
		this.body = qr.createImgTag(4);    // creates an <img> tag as text
		//qr.createTableTag(4);  // creates a <table> tag as text
	});

    //二维码图片
	router.get('/qrcode/users/qrcodeuserpage/:id', function*(next) {
        yield this.render("qrcode/qrcodePage");
	});
    router.get('/qrcode/users/templet/:id', function*(next) {
        var resulet = yield QrcodeTemplets.get(this.request.body);
       if(resulet){
           this.body = resulet;
        };
    });


    //新增二维码用户
	router.post('/qrcode/users/add', function*(next) {
		this.body = yield QrcodeUsers.add(this.request.body);
	});
    //二维码用户列表
	router.get('/qrcode/users/list', function*(next) {
		this.body = yield QrcodeUsers.list(this.request.body);
	});
    //通过id获取二维码用户
	router.get('/qrcode/users/get', function*(next) {
		this.body = yield QrcodeUsers.get(this.request.body);
	});
    //更新二维码用户
	router.post('/qrcode/users/update', function*(next) {
		this.body = yield QrcodeUsers.update(this.request.body);
	});
    //删除二维码用户
	router.post('/qrcode/users/delete', function*(next) {
		this.body = yield QrcodeUsers.remove(this.request.body);
	});
	
	    //新增二维码用户模板
	router.post('/qrcode/templets/add', function*(next) {
		this.body = yield QrcodeTemplets.add(this.request.body);
	});
    //二维码用户列表模板
	router.get('/qrcode/templets/list', function*(next) {
		this.body = yield QrcodeTemplets.list(this.request.body);
	});
    //通过id获取二维码用户模板
	router.get('/qrcode/templets/get/:id', function*(next) {
		this.body = yield QrcodeTemplets.get(this.request.body);
        console.log(this.request.body);
	});
    //更新二维码用户模板
	router.post('/qrcode/templets/update', function*(next) {
		this.body = yield QrcodeTemplets.update(this.request.body);
	});
    //删除二维码用户模板
	router.post('/qrcode/templets/delete', function*(next) {
		this.body = yield QrcodeTemplets.remove(this.request.body);
	});
}