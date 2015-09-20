var app = angular.module('ManageApp', ['ui.router', 'kendo.directives']);
app.controller('qcodetempletlist', function ($scope,$http,$state) {
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
	$scope.showqrcode = function(e){
		$(this).append('<img src=""')
		//target="_blank" href="http://qrcode.vshared.top/qrcode/users/qrcodeimg/{{item.id}}"
	}
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
