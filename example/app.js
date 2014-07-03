angular.module('example', ['ui.bootstrap', 'lx.alert'])
    .controller('DemoCtrl', function ($scope, $lxAlert) {
        $scope.lxAlert = $lxAlert;
        $scope.lxAlert.setMsgTimeout(1000);

        $scope.showAlert = function(type) {
            $scope.lxAlert[type](type + ' message from controller');
        };
    });
