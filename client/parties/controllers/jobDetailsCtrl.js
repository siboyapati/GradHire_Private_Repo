/**
 * Created by sboyapati on 10/5/15.
 */

angular.module("socially").controller("JobDetailsCtrl", ['$scope','$stateParams', '$meteor', '$rootScope',
    function($scope, $stateParams, $meteor, $rootScope){

        var x=$stateParams.jobId;

        $scope.jobs = $meteor.object(Jobs, $stateParams.jobId);
        $scope.$meteorSubscribe('jobs');







    }]);
