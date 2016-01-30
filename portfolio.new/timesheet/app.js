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
    self.selectList = selectList;
    self.saveTimes = saveTimes;

    function saveTimes (times) {
        tsService.saveTimes(times);
    }
    function selectList(list) {
        self.selected = angular.isNumber(list) ? $scope.lists[list] : list;
    }
    function add () {
        tsService.add();
    }
    function getFirstTime() {
        tsService.getFirstTime();
    }
    function getSecondTime() {
        tsService.getSecondTime();
    }
    function getThirdTime() {
        tsService.getThirdTime();
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
    function totals() {
        tsService.totals();
    }
    function finale() {
        tsService.finale();
    }
}
