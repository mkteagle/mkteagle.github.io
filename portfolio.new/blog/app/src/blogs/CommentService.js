(function(){
    angular.module('commentService', ['firebase'])
        .service('commentService', commentService);

    commentService.$inject = ['$firebaseArray', '$filter'];

    function commentService ($firebaseArray, $filter) {
        var self = this;
        var ref = new Firebase("https://doingutahdaily.firebaseio.com/comments/");
        self.comments = $firebaseArray(ref);
        var newtime = $filter('date')(new Date(), 'HH:mm:ss');
        var newdate = $filter('date')(new Date(), 'MM/dd/yyyy');
        self.add = add;

        function add () {
            self.comments.$add({name: '', content: '', date: newdate, time: newtime})
        }

    }
})();
