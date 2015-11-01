angular.module("socially").controller("homeCtrl", ['$scope', '$meteor', '$rootScope',
    function ($scope, $meteor, $rootScope) {


        $scope.jobs = $meteor.collection(Jobs);
        $scope.$meteorSubscribe('jobs');

        $scope.facebook_init = function () {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=1669718013243829";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }


        $scope.joblist = $meteor.collection(function () {
            return Jobs.find({}, {limit: 10, sort: {createdAt: -1}});
        });

        $scope.facebook_init();

        $scope.page = 1;
        $scope.perPage = 3;
        $scope.sort = {name: 1};
        $scope.orderProperty = '1';

        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users')

        $scope.$meteorSubscribe("users").then(function (sub) {
            var _userObject = Meteor.users.findOne(Meteor.userId());
            $rootScope.admin = false;
            if (_userObject) {
                $rootScope.userProfile = _userObject.profile;
                if (_userObject.profile && _userObject.profile.isAdmin) {
                    $rootScope.admin = true;
                }
            }

            // Now $rootScope.currentUser should be defined
        });


        $scope.parties = $meteor.collection(function () {
            return Parties.find({}, {
                sort: $scope.getReactively('sort')
            });
        });

        $meteor.autorun($scope, function () {
            $meteor.subscribe('parties', {
                limit: parseInt($scope.getReactively('perPage')),
                skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort: $scope.getReactively('sort')
            }, $scope.getReactively('search')).then(function () {
                $scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
            });
        });

        $scope.remove = function (party) {
            $scope.parties.splice($scope.parties.indexOf(party), 1);
        };

        $scope.removeAll = function () {
            $scope.parties.remove();
        };

        $scope.pageChanged = function (newPage) {
            $scope.page = newPage;
        };

        $scope.$watch('orderProperty', function () {
            if ($scope.orderProperty)
                $scope.sort = {name: parseInt($scope.orderProperty)};
        });

        $scope.rsvp = function (partyId, rsvp) {
            $meteor.call('rsvp', partyId, rsvp).then(
                function (data) {
                    console.log('success responding', data);
                },
                function (err) {
                    console.log('failed', err);
                }
            );
        };

        $scope.outstandingInvitations = function (party) {
            return _.filter($scope.users, function (user) {
                return (_.contains(party.invited, user._id) && !_.findWhere(party.rsvps, {user: user._id}));
            });
        };

        $scope.getUserById = function (userId) {
            return Meteor.users.findOne(userId);
        };

        $scope.creator = function (party) {
            if (!party)
                return;
            var owner = $scope.getUserById(party.owner);
            if (!owner)
                return 'nobody';

            if ($rootScope.currentUser)
                if ($rootScope.currentUser._id)
                    if (owner._id === $rootScope.currentUser._id)
                        return 'me';

            return owner;
        };
    }]);