(function () {
    'use strict';
    angular.module('oathService', [])
        .service ('oathService', oathService);

    oathService.$inject = ['$firebaseAuth'];

    function oathService($firebaseAuth) {
        var ref = new Firebase('https://glaring-inferno-7989.firebaseio.com/blog/web/oauth');
        var auth = $firebaseAuth(ref);
        return auth;
    }

})();
