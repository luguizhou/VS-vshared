//管理端首页
app.register.controller('qcodeuserlist', function ($scope,$http,$state) {

   
    $scope.initList = function(){
        $http.get('/qrcode/users/list')
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
    $scope.deleteClick = function (e) {
        if(confirm("确定要删除?")){
            $http.post('/qrcode/users/delete',{id: e.id})
                .success(function (response) {
                    if (!response.data ) return;
                    $scope.initList();
                });
        }

    };
    $scope.editeClick = function (e) {

        $scope.$emit("to-parent", {from:'qrcodeuserlist',to:'qrcodeuser',data:e});
        $state.go("homepages", { module: 'qrcode', page: 'qcodeuser'});
    };
    /*
    $scope.user = {username:'',templetid:""};
    $scope.saveQrcodeUser = function(e){
        $http.post('/qrcode/users/add',$scope.user)
        .success(function (response) {
            if (!response.data || !response.data.length) {
                //alert("新建成功！");
                $('#myModal').modal('toggle')
                $scope.user = {username:'',templetid:""};
                $scope.initList();
            }else{
                alert("新建失败！");
                return;
            };
        });
    };*/
});
