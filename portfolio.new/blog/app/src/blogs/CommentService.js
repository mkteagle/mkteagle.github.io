(function(){
    angular.module('commentService', ['firebase'])
        .service('commentService', commentService);

    commentService.$inject = ['$firebaseArray', '$filter'];

    function commentService ($firebaseArray, $filter) {
        var ref = new Firebase("https://doingutahdaily.firebaseio.com/comments/");
    }
})();
