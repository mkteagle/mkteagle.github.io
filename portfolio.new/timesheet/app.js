angular.module('timeSheet', ['tsService', 'ngDialog', 'toastr', 'ngAnimate'])
    .controller('timeSheetController', timeSheetController);
timeSheetController.$inject = ['tsService', 'ngDialog', 'toastr'];

function timeSheetController (tsService, ngDialog, toastr) {
    var self = this;
    self.timesheets = tsService.timesheets;
    self.getFirstTime = getFirstTime;
    self.getSecondTime = getSecondTime;
    self.getThirdTime = getThirdTime;
    //self.totals = totals;
    //self.finale = finale;
    self.add = add;
    self.clickURL = clickURL;
    self.toastMe = toastMe;
    self.firstTime = tsService.firstTime;
    self.key = tsService.key;
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
    //function totals() {
    //    tsService.totals();
    //}
    //function finale() {
    //    tsService.finale();
    //}
}
