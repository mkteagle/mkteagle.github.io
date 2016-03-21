(function(){
    angular.module('commentService', ['firebase'])
        .service('commentService', commentService);

    commentService.$inject = ['$firebaseArray', '$filter', 'blogService'];

    function commentService ($firebaseArray, $filter, blogService) {
        var self = this;
        var ref = new Firebase("https://doingutahdaily.firebaseio.com/comments/");
        self.comments = $firebaseArray(ref);
        var newtime = $filter('date')(new Date(), 'HH:mm:ss');
        var newdate = $filter('date')(new Date(), 'MM/dd/yyyy');
        self.selected = blogService.post;
        self.add = add;
        function add () {
            //console.log(self.selected.title);
            self.comments.$add({name: '', content: '', reference: 'new comment', date: newdate, time: newtime})
        }
    }
})();
