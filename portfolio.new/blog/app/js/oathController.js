(function() {
    angular.module('oathController', [])
        .controller('oathController', oathController);

    oathController.$inject = ['oathService', '$scope'];

    function oathController (oathService, $scope) {

            $scope.login = function() {
                oathService.$authWithPassword({
                    email: $scope.email,
                    password: $scope.password
                }).then(function () {
                    console.log('Worked!!!')
                }).catch(function (error) {
                    console.error('Auth Failed', error);
                });
    };

            $scope.signUp = function() {
                oathService.$createUser( {
                    email: $scope.email,
                    password: $scope.password
                }).then(function () {
                    console.log('Worked!!!')
                }).catch(function (error) {
                    console.error('Did Not Create User', error);
                })
            };
            $scope.google = function() {
                oathService.$authWithOAuthPopup("google").then(function(authData) {
                    $scope.$parent.othData = authData.google;
                    console.log(authData);
                    console.log("Logged in as:", authData.uid);
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
            };
            $scope.facebook = function() {
                oathService.$authWithOAuthPopup("facebook").then(function(authData) {
                    $scope.$parent.othData = authData.facebook;
                    console.log("Logged in as:", authData.uid);
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
            };
            $scope.github = function() {
                oathService.$authWithOAuthPopup("github").then(function(authData) {
                    $scope.$parent.othData = authData.github;
                    console.log("Logged in as:", authData.uid);
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
            };
            $scope.twitter = function() {
                oathService.$authWithOAuthPopup("twitter").then(function(authData) {
                    $scope.$parent.othData = authData.twitter;
                    console.log("Logged in as:", authData.uid);
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
            };
    }
})();
