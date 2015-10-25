/**
 * Created by sboyapati on 10/22/15.
 */
angular.module("socially").controller("AllJobsCtrl", ['$scope', '$window', '$stateParams', '$meteor', '$rootScope',
    function ($scope, $window, $stateParams, $meteor, $rootScope) {


        $scope.checkboxes = {EntryLevel: true, Experienced: true, Internship: true};
        $scope.expLevel = ["Internship", "EntryLevel", "Experienced"];
        $scope.roles=['SoftwareEngineering','HardwareEngineering','Operations','Sales','ProductManager','Designer'];
        $scope.items = [1,2,3,4,5];
        $scope.selected = [];
        $scope.roles_selection=['SoftwareEngineering','HardwareEngineering','Operations','Sales','ProductManager','Designer'];



        $scope.jobs = $meteor.object(Jobs, $stateParams.jobId);
        $scope.$meteorSubscribe('jobs');


        $scope.joblist = $meteor.collection(function () {
            return Jobs.find({
                "job.expLevel": {$in: $scope.getReactively('expLevel')},
                "job.primaryRole": {$in: $scope.getReactively('roles_selection')}
            }, {sort: {createdAt: -1}});
            //return Jobs.find({ "job.expLevel": { $in: $scope.getReactively('expLevel') } }  ,{sort: {createdAt: -1}});

            //return Jobs.find({"job.expLevel":'entryLevel'}, {sort: {createdAt: -1}});
            //db.users.find({"username" : "joe", "age" : 27})
        });





        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
            $scope.roles_selection=angular.copy($scope.selected);
            if(!$scope.selected[0]){
                $scope.roles_selection =angular.copy($scope.roles);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };


        $scope.roleFunc = function (item,list) {
            var x=item;
            var y =list;
            debugger;


        }

        $scope.expLevelFunc = function () {

            $scope.expLevel = ["Internship", "EntryLevel", "Experienced"];

            if (!$scope.checkboxes.EntryLevel) {
                var i = $scope.expLevel.indexOf('EntryLevel');
                if (i != -1) {
                    $scope.expLevel.splice(i, 1);
                }
            }
            if (!$scope.checkboxes.Internship) {
                var i = $scope.expLevel.indexOf('Internship');
                if (i != -1) {
                    $scope.expLevel.splice(i, 1);
                }
            }

            if (!$scope.checkboxes.Experienced) {
                var i = $scope.expLevel.indexOf('Experienced');
                if (i != -1) {
                    $scope.expLevel.splice(i, 1);
                }
            }

            if (!$scope.checkboxes.EntryLevel && !$scope.checkboxes.Internship && !$scope.checkboxes.Experienced) {
                $scope.expLevel = ["Internship", "EntryLevel", "Experienced"];
            }

        }


    }]);