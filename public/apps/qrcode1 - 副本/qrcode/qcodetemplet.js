//管理端首页
app.register.controller('qcodetemplet', function ($scope,$http,$state) {
	if(window.localStorage.getItem('templetData')){
		$scope.templet = JSON.parse(window.localStorage.getItem('templetData'));
	}else{
		$scope.templet={id:'',name:'', content:''};
	}
	$scope.tem = false;
	
	$scope.inituedotor = function(){
		$scope.serverPath = '/server/umeditor/',
        $scope.um = UE.getEditor('container', {
            imageUrl:$scope.serverPath + "imageUp.php",
            imagePath:$scope.serverPath,
            initialFrameHeight:200,
            initialFrameWidth:465,
            lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
            langPath:"/ueditor/lang/",
            focus: true
        });
		$scope.ue = UE.getEditor('product_feature',{
			initialFrameWidth:450
		});
		$scope.ue1 = UE.getEditor('product_description',{
			initialFrameWidth:450
		});
		$scope.ue2 = UE.getEditor('templet1_content',{
			initialFrameWidth:450
		});
	   
		$scope.ue.addListener('contentChange', function() {
			$("#product_style").html(ue.getContent());
		});
		$scope.ue1.addListener('contentChange', function() {
			$("#use_method").html(ue1.getContent());
		});

		$scope.ue2.addListener('contentChange', function() {
			$("[data-content]").html(ue2.getContent());
			$scope.templet.content = ue2.getContent();
		});
	}
	/*
	$scope.serverPath = '/server/umeditor/',
        $scope.um = UE.getEditor('container', {
            imageUrl:$scope.serverPath + "imageUp.php",
            imagePath:$scope.serverPath,
            initialFrameHeight:200,
            initialFrameWidth:465,
            lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
            langPath:"/ueditor/lang/",
            focus: true
        });
		$scope.ue = UE.getEditor('product_feature',{
			initialFrameWidth:450
		});
		$scope.ue1 = UE.getEditor('product_description',{
			initialFrameWidth:450
		});
		$scope.ue2 = UE.getEditor('templet1_content',{
			initialFrameWidth:450
		});
	   
		$scope.ue.addListener('contentChange', function() {
			$("#product_style").html(ue.getContent());
		});
		$scope.ue1.addListener('contentChange', function() {
			$("#use_method").html(ue1.getContent());
		});

		$scope.ue2.addListener('contentChange', function() {
			$("[data-content]").html(ue2.getContent());
			$scope.templet.content = ue2.getContent();
		});
	*/
	$scope.inituedotor();
    $scope.saveQrcodeTemplet = function(e){
        $http.post('/qrcode/templets/add',$scope.templet)
            .success(function (response) {
                if (!response.data || !response.data.length) {
                    //alert("新建成功！");
                    $scope.templet={id:'',name:'', content:''};
					$state.go('homepages',{module:'qrcode',page:'qcodetempletlist'})
                }else{
                    alert("新建失败！");
                    return;
                };
            });
    };
});
