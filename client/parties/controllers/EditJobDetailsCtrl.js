
angular.module("socially").controller("EditJobDetailsCtrl", ['$scope','$window', '$stateParams', '$meteor', '$rootScope',
    function ($scope,$window, $stateParams, $meteor, $rootScope) {

        //$scope.jobs = $meteor.object(Jobs, $stateParams.jobId,false);
        $scope.jobs = $scope.$meteorObject(Jobs, $stateParams.jobId, false);

        $scope.$meteorSubscribe('jobs');

        $scope.updateJob = function (jobObject) {
            $meteor.call('updateJob', jobObject, $stateParams.jobId).then(
                function(data){
                    console.log('success inviting', data);
                },
                function(err){
                    console.log('failed', err);
                }
            );
            // $scope.jobs.update({_id:stateParams.jobId},{$set:{job:jobObject}});
        }

    }]);
