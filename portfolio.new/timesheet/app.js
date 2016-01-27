angular.module('timeSheet', [])
    .controller('timeSheetController', timeSheetController);
//timeSheetController.$inject = ['tsService'];
function timeSheetController () {
    var self = this;
    self.firstime = 0;
    self.secondtime = 0;
    self.thirdtime = 0;
    self.total = 0;
    self.finalCalc = 0;
    self.h = 0;
    self.m = 0;
    self.s = 0;
    self.hours = 0;
    self.mins = 0;
    self.secs = 0;
    self.getFirstTime = getFirstTime;
    self.getSecondTime = getSecondTime;
    self.getThirdTime = getThirdTime;
    self.totals = totals;
    self.finale = finale;
    function getFirstTime() {
        var date = new Date();
        self.firsttime = Math.floor((date.getTime() / 1000) % 60);
    }
    function getSecondTime() {
        var date = new Date();
        self.secondtime = Math.floor((date.getTime() / 1000) % 60);
        totals();
    }
    function getThirdTime() {
        var date = new Date();
        self.thirdtime = Math.floor((date.getTime() / 1000) % 60);
        finale();
    }
    function totals() {
        self.eight = 28800;
        self.total = self.eight - (self.secondtime - self.firsttime);
        var d = Number(self.total);
        self.h = Math.floor(d / 3600);
        self.m = Math.floor(d % 3600 / 60);
        self.s = Math.floor(d % 3600 % 60);
        var date = new Date();
        self.hours = (date.getHours() + self.h);
        self.mins = (date.getMinutes() + self.m);
        self.secs = (date.getSeconds() + self.s);
        self.total = (self.hours + ":" + self.mins + ":" + self.secs);
    }
    function finale() {
        var date = new Date();
        self.hours = (date.getHours() + self.h);
        self.mins = (date.getMinutes() + self.m);
        self.secs = (date.getSeconds() + self.s);
        self.finalCalc = (self.hours + ":" + self.mins + ":" + self.secs);
    }
}
