(function () {
    'use strict';

    angular.module('tsService', ['firebase'])
        .service('tsService', tsService);
    tsService.$inject = ['$firebaseArray', '$filter'];
    function tsService($firebaseArray, $filter) {
        var self = this;
        var url = "https://glaring-inferno-7989.firebaseio.com/timesheet";
        var times = new Firebase(url);
        self.timesheets = $firebaseArray(times);
        self.dateStamp = 0;
        self.firsttime = 0;
        self.secondtime = 0;
        self.thirdtime = 0;
        self.ftime = 0;
        self.stime = 0;
        self.total = 0;
        self.finalCalc = 0;
        self.h = 0;
        self.m = 0;
        self.hours = 0;
        self.mins = 0;

        self.totals = totals;
        self.add = add;
        self.finale = finale;
        self.getFirstTime = getFirstTime;
        self.getSecondTime = getSecondTime;
        self.getThirdTime = getThirdTime;

        function add () {
            self.dateStamp = $filter('date')(new Date(), 'MM-dd-yyyy');
            self.timesheets.$add({id: self.dateStamp, firstTime: self.firsttime, secondTime: self.secondtime, thirdTime: self.thirdtime, totals: self.total, finalCalc: self.finalCalc})
        }
        function getFirstTime() {
            var date = new Date();
            console.log((date.getTimezoneOffset() / 1000) % 60);
            self.ftime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            console.log(self.ftime);
            self.firsttime = $filter('date')(new Date(), 'HH:mm:ss');
            console.log(self.firsttime);
            self.timesheets.child('id').child(self.dateStamp).$save();
        }
        function getSecondTime() {
            var date = new Date();
            self.stime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            self.secondtime = date;
            totals();
            self.timesheets.$save();
        }
        function getThirdTime() {
            var date = new Date();
            self.ttime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            self.thirdtime = date;
            finale();
            self.timesheets.$save();
        }

        function totals () {
            self.eight = 28800;
            self.total = self.eight - (self.stime - self.ftime);
            var d = Number(self.total);
            self.h = Math.floor(d / 3600);
            self.m = Math.floor(d % 3600 / 60);
            var date = new Date();
            self.hours = Math.floor((date.getHours() + self.h));
            console.log (self.hours);
            self.mins = Math.floor((date.getMinutes() + self.m) % 60);
            self.total = (self.hours + ":" + self.mins);
            self.timesheets.$save();
        }
        function finale() {
            var date = new Date();
            self.hours = (date.getHours() + self.h);
            self.mins = (date.getMinutes() + self.m) % 60;
            self.finalCalc = (self.hours + ":" + self.mins);
            self.timesheets.$save();
        }
    }

})();
