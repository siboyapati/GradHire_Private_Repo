/**
 * Created by sboyapati on 10/5/15.
 */

angular.module("socially").controller("PostNewJobCtrl", ['$scope', '$meteor', '$rootScope',
    function($scope, $meteor, $rootScope){



        $scope.tinymceOptions = {
            onChange: function(e) {
                // put logic here for keypress and cut/paste changes
            },

            resize: false,
            width: 400,  // I *think* its a number and not '400' string
            height: 800,
            plugins: 'print textcolor',
            toolbar: "undo redo styleselect bold italic print forecolor backcolor",
            inline: false,
            plugins : 'advlist autolink link image lists charmap print preview',
            skin: 'lightgray',
            theme : 'modern'
        };




    }]);
