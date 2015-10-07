
angular.module("socially").controller("PostNewJobCtrl", ['$scope', '$meteor', '$rootScope',"$injector",
    function($scope, $meteor, $rootScope, $injector){
        var constants = $injector.get('constants');
        $scope.state = constants.USStates;

        $scope.saveJob = function(job){
            var x =10;
            debugger;
        }


        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');




    }]);
