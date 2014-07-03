angular.module('example', ['ui.bootstrap', 'lx.alert'])
    .controller('DemoCtrl', function ($scope, $lxAlert) {
        $scope.lxAlert = $lxAlert;
        $scope.showAlert = function(type) {
            $scope.lxAlert[type]('Info message from controller');
        };
    });
