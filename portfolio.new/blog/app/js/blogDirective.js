(function() {
    'use strict';
    angular.module('blogDirective', [])
        .directive("clickTo", function () {
            return {
                restrict: "A",
                templateUrl: "./src/templates/clickto.html"
            }
        })
        .directive("clickToTag", function(){
            return {
                restrict: "A",
                templateUrl: "./src/templates/clicktotag.html"
            }
        });

}());


