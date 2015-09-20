var app = angular.module('ManageApp',[]);
//管理端首页
app.controller('qcodetempletlist', function ($scope,$http) {
    $scope.initList = function(){
        $http.get('/qrcode/templets/list')
            .success(function (response) {
                if (response.data) {
                    //alert("新建成功！");
                    $scope.source =response.data;
                }else{
                    //alert("新建失败！");
                    return;
                };
            });

    };
    $scope.initList();

	$scope.editeClick = function (e) {
		window.localStorage.setItem("templetData",JSON.stringify(e));
		window.location.href="index_templet.html";
    };
    $scope.deleteClick = function (e) {
        if(confirm("确定要删除?")){
            $http.post('/qrcode/templets/delete',{id: e.id})
                .success(function (response) {
                    if (!response.data ) return;
					   $scope.initList();
                });
        }

    }

})
.controller('qcodetemplet', function ($scope,$http) {
	var url = window.location.href;
	if(window.localStorage.getItem('templetData')&&url.indexOf('t=1')==-1){
		$scope.templet = JSON.parse(window.localStorage.getItem('templetData'));
	}else{
		$scope.templet={id:'',name:'', content:''};
	}
	$scope.tem = false;
	
	$scope.inituedotor = function(){
		var serverPath = '/server/umeditor/';
        var um = UE.getEditor('container', {
            imageUrl:serverPath + "imageUp.php",
            imagePath:serverPath,
            initialFrameHeight:200,
            initialFrameWidth:465,
            lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
            langPath:"/ueditor/lang/",
            focus: true
        });
		var ue = UE.getEditor('product_feature',{
			initialFrameWidth:450
		});
		var ue1 = UE.getEditor('product_description',{
			initialFrameWidth:450
		});
		var ue2 = UE.getEditor('templet1_content',{
            imageUrl:serverPath + "imageUp.php",
            imagePath:serverPath,
			initialFrameWidth:450
		});
	   
		ue.addListener('contentChange', function() {
			$("#product_style").html(ue.getContent());
		});
		ue1.addListener('contentChange', function() {
			$("#use_method").html(ue1.getContent());
		});

		ue2.addListener('contentChange', function() {
			$("[data-content]").html(ue2.getContent());
			$scope.templet.content = ue2.getContent();
		});
		 ue2.addListener( 'ready', function( editor ) {
			 ue2.setContent($scope.templet.content)
			 //editor.execCommand( 'focus' ); //编辑器家在完成后，让编辑器拿到焦点
		 } );
	};
	$scope.inituedotor();
    $scope.saveQrcodeTemplet = function(e){
        var urltype = 'add';
        if($scope.templet.id){
            urltype = 'update';
    }
        $http.post('/qrcode/templets/'+urltype,$scope.templet)
            .success(function (response) {
                if (!response.data || !response.data.length) {
                    //alert("新建成功！");
                    window.location.href="index.html"
                }else{
                    alert("新建失败！");
                    return;
                };
            });
    };
});