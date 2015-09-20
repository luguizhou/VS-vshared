//管理端首页
app.register.controller('qcodetempletlist', function ($scope,$http,$state) {
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
        $state.go("homepages", { module: 'qrcode', page: 'qcodetemplet'});
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

});
