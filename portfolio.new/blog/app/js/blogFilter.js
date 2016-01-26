(function() {
    'use strict';

    angular.module('blogFilter', [])
        .filter('dateNew', function() {
            return function(input) {
                if (input == null) { return ""; }
                return new Date(input);
        }
        });
}());

