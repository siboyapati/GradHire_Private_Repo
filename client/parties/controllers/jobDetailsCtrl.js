/**
 * Created by sboyapati on 10/5/15.
 */

angular.module("socially").controller("JobDetailsCtrl", ['$scope','$window', '$stateParams', '$meteor', '$rootScope',
    function ($scope,$window, $stateParams, $meteor, $rootScope) {

        var x = $stateParams.jobId;

        $scope.jobs = $meteor.object(Jobs, $stateParams.jobId);
        $scope.$meteorSubscribe('jobs');

        $scope.deleteJob = function () {
            if ($stateParams.jobId) {
                $meteor.call('deleteJob', $stateParams.jobId).then(
                    function (data) {
                        console.log('success', data);
                        $window.location.href = '/home';
                    },
                    function (err) {
                        console.log('error', err)
                    }
                )

            }
        }

        $scope.editJob=function(){
            $window.location.href = '/editjobdetails/'+$stateParams.jobId;
        }


    }]);
