angular.module("socially").controller("PostNewJobCtrl", ['$scope', '$meteor', '$rootScope', "$injector","$mdDialog",
    function ($scope, $meteor, $rootScope, $injector ,$mdDialog) {

        //injection
        var constants = $injector.get('constants');
        $scope.state = constants.USStates;

        $scope.jobs = $meteor.collection(Jobs);
        $scope.$meteorSubscribe('jobs');

        $scope.userIsLoggedIn = false;
        Deps.autorun(function (c) {
            if(!Meteor.userId())
            {
                $scope.userIsLoggedIn = false;
            }
            else
            {
                $scope.userIsLoggedIn = true;
            }
        });


        $scope.addJob = function (job) {
            if (job) {
                $meteor.call('addJob', job).then(
                    function (data) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Success')
                                .content('Your job posting has been successfully submitted.')
                                .ariaLabel('Left to right demo')
                                .ok('Close')

                        );
                    },
                    function (error) {
                        console.log('success inviting', error);
                    }
                )
            }

        };


    }]);


