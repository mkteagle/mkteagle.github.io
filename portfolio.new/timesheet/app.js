angular.module('timeSheet', ['ngMaterial', 'ngAria', 'tsService', 'ngDialog', 'toastr', 'ngAnimate'])
    .controller('timeSheetController', timeSheetController);
timeSheetController.$inject = ['tsService', 'ngDialog', 'toastr'];

function timeSheetController (tsService, ngDialog, toastr) {
    var self = this;
    self.timesheets = tsService.timesheets;
    self.getFirstTime = getFirstTime;
    self.getSecondTime = getSecondTime;
    self.getThirdTime = getThirdTime;
    self.totals = totals;
    self.finale = finale;
    self.add = add;
    self.clickURL = clickURL;
    self.toastMe = toastMe;
    self.selected = null;
    self.firstTime = tsService.firstTime;
    self.secondTime = tsService.secondTime;
    self.thirdTime = tsService.thirdTime;
    self.total = tsService.total;
    self.key = tsService.key;
    self.finalCalc = tsService.finalCalc;
    self.selectTimesheet = selectTimesheet;
    self.getChange = getChange;

    function getChange (times) {
        tsService.getChange(times);
    }
    function selectTimesheet(timesheet) {
        self.selected = angular.isNumber(timesheet) ? $scope.timesheets[timesheet] : timesheet;
        console.log(self.selected);
    }
    function add () {
        tsService.add();
    }
    function getFirstTime(ts) {
        tsService.getFirstTime(ts);
    }
    function getSecondTime(ts) {
        tsService.getSecondTime(ts);
    }
    function getThirdTime(ts) {
        tsService.getThirdTime(ts);
    }
    function clickURL() {
        ngDialog.open({
            template: '<p> my template </p>',
            plain: true
        });
    }
    function toastMe() {
        toastr.success('Hello world!', 'Toastr fun!');
    }
    function totals(ts) {
        tsService.totals(ts);
    }
    function finale(ts) {
        tsService.finale(ts);
    }
}
