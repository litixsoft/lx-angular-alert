angular.module('example', [
    'ngRoute',
    'ui.bootstrap',
    'hljs',
    'lx.alert'
])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', { templateUrl: 'alert.html', controller: 'AlertCtrl' })
            .otherwise({ redirectTo: '/' });
    })
    .controller('AlertCtrl', function ($scope, $lxAlert) {
        $scope.lxAlert = $lxAlert;
        $scope.showAlert = function(type) {
            $scope.lxAlert[type]('Info message from controller');
        };
    });
