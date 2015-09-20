var app = angular.module('ManageApp', ['ui.router']);

app.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
        app.async = function (url) {
            return function ($http, $q, $state, $rootScope, $stateParams) {
                var route = url ? url :  $stateParams.module+'/'+$stateParams.page + '.html';
                return $http.get(route).then(function (data) {
                    var emptyNode = document.createElement("div");
                    emptyNode.innerHTML = data.data;
                    var scripts = emptyNode.getElementsByTagName("script");
                    var scriptLength = scripts.length;
                    var scriptNode = null;
                    var scriptUrls = [];
                    for (var i = 0; i < scripts.length; i++) {
                        scriptNode = scripts[i];
                        if (scriptNode.type !== 'text/javascript' && scriptNode.text) continue;
                        if (scriptNode.src)
                            scriptUrls.push(scriptNode.src);
                    }
                    for (var i = scripts.length - 1; i >= 0; i--) {
                        scriptNode = scripts[i];
                        if (scriptNode.type !== 'text/javascript' && scriptNode.text) continue;
                        scriptNode.parentNode.removeChild(scriptNode);
                    }
                    var deferred = $q.defer();
                    $script(scriptUrls, function () {
                        $rootScope.$apply(function () {
                            deferred.resolve(emptyNode.innerHTML);
                        });
                    });
                    return deferred.promise;
                });
            }
        };
    }
);

app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateProvider: function (html) {
                    return html;
                },
                resolve: {
                    html: app.async('app/admin/login/login.html')
                }
            })
            .state('home', {
                url: '/home',
                templateProvider: function (html) {
                    return html;
                },
                resolve: {
                    html: app.async('home/home.html')
                }
            })
            .state('homepages', {
                url: '/:module/:page',
                templateProvider: function (html) {
                    return html;
                },
                resolve: {
                    html: app.async()
                }
            })
            .state('home.notfound', {
                url: '/notfound/:url',
                templateProvider: ['$stateParams', function ($stateParams) {
                    return '<h3>Not Found</h3><p>url: ' + $stateParams.url + '</p>';
                } ]
            });
    }
);
app.factory('UpdateQrcode', function () {
    return {id: "345", name: "teddy"};
});
app.controller('HomeController', function ($state) {
    $state.go('login');
});
//�������ҳ
app.controller('PortalContrl', function ($scope) {
    $scope.$on('to-parent', function (event, data) {
        $scope.$broadcast('to-child', data);
    });
});

//��̨���� --����
app.controller('TopController', function ($scope, $http, $state) {
    var userData = JSON.parse(localStorage.getItem('userData'));

    $scope.allSetting = function () {
        alert('����');
    };
    $scope.callHelp = function () {
        alert('����');
    };
    $scope.loginOut = function () {
        $http.get('/admin/LoginController/logout')
            .success(function (response) {
                $state.go('login');
            });
    };
});

//��̨���� --�м����
app.controller('ContentController', function ($scope, $http, $state) {
   /* $http.get('/admin/topmenulist')
        .success(function (response) {
            if (!response.data || !response.data.length) return;
            var resData = response.data;
            $scope.treeDataSource = resData;
            var menuDataSource = [];
            for (var i = 0, len = resData.length; i < len; i++) {
                menuDataSource.push({ text: resData[i].text });
            };
            //$scope.treeData = new kendo.data.HierarchicalDataSource({ data:resData});
        });
*/
    $scope.treeViewClick = function (menuurl) {

        if (!menuurl) {
            $state.go('home.notfound');
            return;
        }
        var items = menuurl.split('/');
        if (items.length !== 2) {
            $state.go('home.notfound', { url: menuurl });
            return;
        }
        $state.go("homepages", { module: items[0], page: items[1]});

    };
});