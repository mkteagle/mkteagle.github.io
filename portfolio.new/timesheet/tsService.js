(function () {
    'use strict';

    angular.module('tsService', ['firebase'])
        .service('tsService', tsService);
    tsService.$inject = ['$filter', '$firebaseArray'];
    function tsService($filter, $firebaseArray) {
        var self = this;
        var ref = new Firebase("http://worktimesheets.firebaseio.com/timesheets");
        self. timesheets = $firebaseArray(ref);
        self.dateStamp = 0;
        self.firstTime = '';
        self.secondTime = '';
        self.thirdTime = '';
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
        self.getChange = getChange;
        self.checkOutbounds = checkOutbounds;
        self.checkLessTen = checkLessTen;
        //self.saveTimes = saveTimes;
        self.updateMe = updateMe;

        function add () {
            self.dateStamp = $filter('date')(new Date(), 'MM-dd-yyyy');
            self.timesheets.$add({name: self.dateStamp, firstTime: self.firstTime, secondTime: self.secondTime, thirdTime: self.thirdTime, totals: self.total, finalCalc: self.finalCalc});
        }
        function updateMe(ts) {
            self.timesheets.$save(ts)
        }
        function getFirstTime(ts) {
            var date = new Date();
            self.ftime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            var newdate = $filter('date')(new Date(), 'HH:mm:ss');
            ts.firstTime = newdate;
            self.updateMe(ts);
        }
        function getSecondTime(ts) {
            var date = new Date();
            date.setHours(date.getHours() + 3);
            console.log(date);
            self.stime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            console.log(self.stime);
            var newdate = $filter('date')(new Date(), 'HH:mm:ss');
            ts.secondTime = newdate;
            self.updateMe(ts);
            self.totals(ts);
        }
        function getThirdTime(ts) {
            var date = new Date();
            date.setHours(date.getHours() + 6);
            console.log(date);
            self.ttime = Math.floor((date.getTimezoneOffset() / 1000) % 60);
            var newdate = $filter('date')(new Date(), 'HH:mm:ss');
            ts.thirdTime = newdate;
            self.updateMe(ts);
            self.finale(ts);
        }

        function totals (ts) {
            self.eight = 28800;
            self.ftime = ts.firstTime.substr(0, ts.firstTime.indexOf(':'));
            console.log(self.ftime);
            //self.stime = ts.secondTime.replace([^,]*$, ts.secondTime);
            console.log(self.stime);
            self.total = self.eight - (self.stime - self.ftime);
            console.log(self.total);
            var d = Number(self.total);
            self.h = Math.floor(d / 3600);
            self.m = Math.floor(d % 3600 / 60);
            var date = new Date();
            self.hours = Math.floor((date.getHours() + self.h));
            self.mins = Math.floor((date.getMinutes() + self.m) % 60);
            ts.total = (self.hours + ":" + self.mins);
            self.updateMe(ts);
        }
        function finale(ts) {
            var date = new Date();
            self.hours = (date.getHours() + self.h);
            self.mins = (date.getMinutes() + self.m) % 60;
            checkOutbounds(self.hours);
            checkLessTen(self.mins);
            ts.finalCalc = (self.hours + ":" + self.mins);
            self.updateMe(ts);
            console.log(ts.finalCalc);
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
        function getChange(times) {
            self.timesheets.$save(times);
        }
    }

})();
