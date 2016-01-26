angular.module('timeSheet', [])
    .controller('timeSheetController', timeSheetController);
//timeSheetController.$inject = ['tsService'];
function timeSheetController () {
    var self = this;
    self.getFirstTime = getFirstTime;
    self.getSecondTime = getSecondTime;
    self.getThirdTime = getThirdTime;
    self.totals = totals;
    self.timeConverter = timeConverter;
    function getFirstTime() {
        console.log(timeConverter(1453787100));
        self.firsttime = new Date(timeConverter(1453787100));
    }
    function getSecondTime() {
        var timee = Date.now();
        console.log(timeConverter(1453792505));
        self.secondtime = new Date(timeConverter(1453792505));
    }
    function getThirdTime() {
        self.thirdtime = new Date();
        var third = self.thirdtime;
        totals(third);
    }
    function totals(time) {
        var total2 = self.firsttime - self.secondtime;
        console.log(total2);
        self.total = time.setHours(time.getHours() + 8 - total2);
    }
    function timeConverter(UNIX_timestamp){
        var time;
        var a = new Date(UNIX_timestamp*1000);
        var hour = a.getUTCHours();
        var min = a.getUTCMinutes();
        if (hour < 10) {
            time = '0'+hour+':'+min;
            return time;
        }
        else {
            time = hour+':'+min;
            return time;
        }
    }
}
