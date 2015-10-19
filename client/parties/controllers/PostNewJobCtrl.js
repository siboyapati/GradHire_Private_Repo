

angular.module("socially").controller("PostNewJobCtrl", ['$scope', '$meteor', '$rootScope', "$injector",
    function ($scope, $meteor, $rootScope, $injector) {

        //injection
        var constants = $injector.get('constants');
        $scope.state = constants.USStates;

        $scope.jobs = $meteor.collection(Jobs);
        $scope.$meteorSubscribe('jobs');
        var x = Meteor.user();


        //Methods

        $scope.addJob = function (job) {
            $meteor.call('addJob', job).then(
                function(data){
                    console.log('success inviting', data);
                    sAlert.close('warningThatWeWantToCloseLater');
                },
                function(error){
                    console.log('success inviting', data);
                }
            )
        };


    }]);


