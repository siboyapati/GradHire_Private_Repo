/**
 * Created by sboyapati on 10/9/15.
 */
angular.module('socially')
    .filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
