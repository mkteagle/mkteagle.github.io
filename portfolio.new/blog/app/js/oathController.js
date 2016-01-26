(function() {
    angular.module('oathController', [])
        .controller('oathController', oathController);

    oathController.$inject = ['oathService'];

    function oathController (oathService) {
        var self = this;
        self.othData = oathService.othData;
        self.login = function () {
            oathService.login();
        };
        self.google = function() {
            oathService.google();
            self.othData = oathService.othData;
        };
        self.logout = function() {
            oathService.logout();
        }
    }
})();
