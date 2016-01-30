(function () {
    'use strict';

    angular.module('tsService', ['firebase'])
        .service('tsService', tsService);
    tsService.$inject = ['$firebaseArray', '$filter'];
    function tsService($firebaseArray, $filter) {
        var self = this;
        var url = "worktimesheets.firebaseIO.com/timesheets";
        var times = new Firebase(url);
        self.timesheets = $firebaseArray(times);
        self.dateStamp = 0;
        self.firstTime = null;
        self.secondTime = null;
        self.thirdTime = null;
        self.ftime = 0;
        self.stime = 0;
        self.total = '';
        self.finalCalc = '';
        self.h = 0;
        self.m = 0;
        self.hours = 0;
        self.mins = 0;
        self.key = '';
        self.totals = totals;
        self.add = add;
        self.finale = finale;
        self.getFirstTime = getFirstTime;
        self.getSecondTime = getSecondTime;
        self.getThirdTime = getThirdTime;
        self.saveTime = saveTime;
        self.checkOutbounds = checkOutbounds;
        self.checkLessTen = checkLessTen;
        self.saveTimes = saveTimes;

        function add () {
            self.dateStamp = $filter('date')(new Date(), 'MM-dd-yyyy');
            self.timesheets.$add({id: self.dateStamp, firstTime: self.firstTime, secondTime: self.secondTime, thirdTime: self.thirdTime, totals: self.total, finalCalc: self.finalCalc}).then(function(ref){
                self.key = ref.key();
                var num = self.timesheets.$indexFor(self.key);
                self.key = num;
            })
        }
        function getFirstTime() {
            var date = new Date();
            self.ftime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            var newdate = $filter('date')(new Date(), 'HH:mm:ss');
            self.timesheets[self.key].firstTime = newdate;
            //saveTime();
        }
        function getSecondTime() {
            var date = new Date();
            date.setHours(date.getHours() + 3);
            console.log(date);
            self.stime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            self.timesheets[self.key].secondTime = $filter('date')(new Date(), 'HH:mm:ss');
            totals();
        }
        function getThirdTime() {
            var date = new Date();
            date.setHours(date.getHours() + 6);
            console.log(date);
            self.ttime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            self.timesheets[self.key].thirdTime = $filter('date')(new Date(), 'HH:mm:ss');
            finale();
        }

        function totals () {
            self.eight = 28800;
            self.total = self.eight - (self.stime - self.ftime);
            var d = Number(self.total);
            self.h = Math.floor(d / 3600);
            self.m = Math.floor(d % 3600 / 60);
            var date = new Date();
            self.hours = Math.floor((date.getHours() + self.h));
            self.mins = Math.floor((date.getMinutes() + self.m) % 60);
            checkOutbounds(self.hours);
            checkLessTen(self.mins);
            self.timesheets[self.key].total = (self.hours + ":" + self.mins);
        }
        function finale() {
            var date = new Date();
            self.hours = (date.getHours() + self.h);
            self.mins = (date.getMinutes() + self.m) % 60;
            checkOutbounds(self.hours);
            checkLessTen(self.mins);
            self.timesheets[self.key].finalCalc = (self.hours + ":" + self.mins);
            console.log(self.finalCalc);
        }
        function saveTime() {
            self.timesheets.$save();
        }
        function checkOutbounds (total) {
            if (total == 24) {
                self.hours = 0;
            }
            if (total > 24) {
                self.hours = 24 - total;
            }
        }
        function checkLessTen (total) {
            if (total < 10) {
                self.mins = '0' + total;
            }
        }
        function saveTimes(times) {
            self.timesheets.$save(times);
        }
    }

})();
