(function() {
    'use strict';

    angular.module('blogFilter', [])
        .filter('dateNew', function() {
            return function(input) {
                if (input == null) { return ""; }
                return new Date(input);
        }
        })
        .filter('removeSpacesThenLowercase', function () {
        return function (text) {

            var str = text.replace(/\s+/g, '');
            return str.toLowerCase();
        };
        });
}());

