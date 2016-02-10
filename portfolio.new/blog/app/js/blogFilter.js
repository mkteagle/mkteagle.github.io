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

            var str = text.replace(/\s+/g, '-');
            var str2 = str.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            return str2.toLowerCase();
        };
        });
}());

