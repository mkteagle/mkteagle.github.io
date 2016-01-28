angular.module('timeSheet', ['tsService'])
    .controller('timeSheetController', timeSheetController);
timeSheetController.$inject = ['tsService'];

function timeSheetController (tsService) {
    var self = this;
    self.timesheets = tsService.timesheets;
    self.getFirstTime = getFirstTime;
    self.getSecondTime = getSecondTime;
    self.getThirdTime = getThirdTime;
    //self.totals = totals;
    //self.finale = finale;
    self.add = add;
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
    //function totals() {
    //    tsService.totals();
    //}
    //function finale() {
    //    tsService.finale();
    //}
}
