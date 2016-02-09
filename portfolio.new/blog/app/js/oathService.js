(function () {
    'use strict';
    angular.module('oathService', [])
        .service ('oathService', oathService);

    oathService.$inject = ['$firebaseAuth', '$firebaseArray'];

    function oathService($firebaseAuth, $firebaseArray) {
        var ref = new Firebase('https://glaring-inferno-7989.firebaseio.com/blog/web/oauth');
        var myref = new Firebase('https://glaring-inferno-7989.firebaseio.com');
        var userAuth = $firebaseArray(myref);
        var auth = $firebaseAuth(ref);
        var self = this;
        self.login = login;
        self.google = google;
        self.logout = logout;
        function login () {
            auth.$authWithPassword({
                email: self.email,
                password: self.password
            }).then(function () {
                console.log('Worked!!!')
            }).catch(function (error) {
                console.error('Auth Failed', error);
            });
        };

        self.signUp = function() {
            auth.$createUser( {
                email: self.email,
                password: self.password
            }).then(function () {
                console.log('Worked!!!')
            }).catch(function (error) {
                console.error('Did Not Create User', error);
            })
        };
        function logout() {
            auth.$unauth();
            console.log('user is logged out');
        }
        function google() {
            auth.$authWithOAuthPopup("google").then(function(authData) {
                self.othData = authData.google;
                console.log(authData);
                console.log("Logged in as:", authData.uid);
                //self.checkuser();
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };
        self.facebook = function() {
            auth.$authWithOAuthPopup("facebook").then(function(authData) {
                self.othData = authData.facebook;
                console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };
        self.github = function() {
            auth.$authWithOAuthPopup("github").then(function(authData) {
                self.othData = authData.github;
                console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };
        self.twitter = function() {
            auth.$authWithOAuthPopup("twitter").then(function(authData) {
                self.othData = authData.twitter;
                console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };
    }

})();
