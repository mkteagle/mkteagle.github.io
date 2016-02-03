(function () {
    'use strict';

    angular.module('blogService', ['firebase'])
        .service('blogService', blogService);

    blogService.$inject = ['$firebaseArray'];

    function blogService($firebaseArray) {
        var ref = new Firebase("https://doingutahdaily.firebaseio.com/blog/");
        var date = Date.now();
        var self = this;
        self.getChange = getChange;
        self.removeBlog = removeBlog;
        self.counties = [
            {id: '1', name: 'Beaver County'},
            {id: '2', name: 'Box Elder County'},
            {id: '3', name: 'Cache County'},
            {id: '4', name: 'Carbon County'},
            {id: '5', name: 'Daggett County'},
            {id: '6', name: 'Davis County'},
            {id: '7', name: 'Duchesne County'},
            {id: '8', name: 'Emery County'},
            {id: '9', name: 'Garfield County'},
            {id: '10', name: 'Grand County'},
            {id: '11', name: 'Iron County'},
            {id: '12', name: 'Juab County'},
            {id: '13', name: 'Kane County'},
            {id: '14', name: 'Millard County'},
            {id: '15', name: 'Morgan County'},
            {id: '16', name: 'Piute County'},
            {id: '17', name: 'Rich County'},
            {id: '18', name: 'Salt Lake County'},
            {id: '19', name: 'San Juan County'},
            {id: '20', name: 'Sanpete County'},
            {id: '21', name: 'Sevier County'},
            {id: '22', name: 'Summit County'},
            {id: '23', name: 'Tooele County'},
            {id: '24', name: 'Uintah County'},
            {id: '25', name: 'Utah County'},
            {id: '26', name: 'Wasatch County'},
            {id: '27', name: 'Washington County'},
            {id: '28', name: 'Wayne County'},
            {id: '29', name: 'Weber County'}];
        self.categories = [
            {id: '1', name: 'Fun in the Sun'},
            {id: '2', name: 'Snow for All'}

        ];
        self.seasons = [
            {id: '1', name: 'Winter'},
            {id: '2', name: 'New Years'},
            {id: '3', name: 'Spring'},
            {id: '4', name: 'Valentines Day'},
            {id: '5', name: "St. Patrick's Day"},
            {id: '6', name: 'Easter'},
            {id: '7', name: 'Memorial Day'},
            {id: '8', name: 'Summer'},
            {id: '9', name: '4th of July'},
            {id: '10', name: 'Pioneer Day'},
            {id: '11', name: 'Labor Day'},
            {id: '12', name: 'Fall'},
            {id: '13', name: 'Halloween'},
            {id: '14', name: 'Thanksgiving'},
            {id: '15', name: 'Holidays'},
            {id: '16', name: 'Christmas'}
        ];
        function removeBlog(blog) {
            self.blogs.$remove(blog);
        }
        self.blogs = $firebaseArray(ref);
        self.addBlog = addBlog;
        function getChange(blog) {
            self.blogs.$save(blog);
        }
        function addBlog(name, pic) {
            self.blogs.$add({name: 'Michael Teagle', date: date, avatar: name[pic], url: '/michael-teagle', content: '', title: '', category: '', location: '', season: '', county: '', posted: false});
        }
    }
})();
