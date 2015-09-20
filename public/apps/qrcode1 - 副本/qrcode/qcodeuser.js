//管理端首页
app.register.controller('qcodeuser', function ($scope,$http,$state,$stateParams) {
    $scope.user = {
        phone:'',
        tel:'',
        templetid:'',
        name:'',
        id:'',
        address:""

    };
    //$scope.$emit("to-parent", {from:'qrcodetepletlist',to:'qrcodeteplet',data:e});
    $scope.$on('to-child',function (event, msg) {
        $scope.user = msg.data;
    });

    $scope.saveQrcodeUser = function(e){
        $http.post('/qrcode/users/add',$scope.user)
            .success(function (response) {
                if (!response.data || !response.data.length) {
                    //alert("新建成功！");
                    $('#myModal1').modal('toggle')
                    $scope.user = {username:'',templetid:""};
                    //$scope.initList();
                    $state.go('homepages',{module:'qrcode',page:'qcodeuserlist'})
                }else{
                    alert("新建失败！");
                    return;
                };
            });
    };
});
