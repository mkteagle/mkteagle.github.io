(function () {

    angular
        .module('blogController', [])
        .controller('BlogController', [
            'blogService', '$mdSidenav', '$mdBottomSheet', '$log', 'oathService',
            BlogController
        ]);

    function BlogController(blogService, $mdSidenav, $mdBottomSheet, oathService) {
        var self = this;
        var svgArr = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
        var svgindex = 0;
        self.selected = null;
        self.blogs = blogService.blogs;
        self.selectBlog = selectBlog;
        self.toggleList = toggleBlogsList;
        self.addBlog = addBlog;
        self.firstList = firstList;
        self.getChange = getChange;
        self.othData = oathService.othData;
        self.google = google;
        self.removeBlog = removeBlog;
        self.logout = logout;
        self.counties = blogService.counties;
        self.categories = blogService.categories;
        self.seasons = blogService.seasons;
        function firstList() {
            self.selected = blogService.blogs[0];
        }

        // *********************************
        // Internal methods
        // *********************************
        function logout() {
            oathService.logout();
        }

        function google() {
            oathService.google();
        }

        function removeBlog(blog) {
            blogService.removeBlog(blog);
            self.selected = blogService.blogs[blogService.blogs.length - 1];
        }

        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function getChange(blog) {
            blogService.getChange(blog)
        }

        function addBlog() {
            blogService.addBlog(svgArr, svgindex);
            svgindex++;
        }


        function toggleBlogsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectBlog(blog) {
            self.selected = angular.isNumber(blog) ? $scope.blogs[blog] : blog;
            self.toggleList();
        }

        self.countOf = function (text) {
            var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
            return s ? s.length : '';
        };
        self.showLoginDialog = function (ev) {
            console.log('from sign in button!');
            $mdDialog.show({
                    templateUrl: './templates/contentlogin.html',
                    targetEvent: ev
                })
                .then(function (userData) {

                }, function () {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };
        self.taggerEnabled = false;
        self.editorEnabled = false;

        self.enableEditor = function (dates) {
            self.editorEnabled = true;
            self.editableValue = dates;
        };

        self.disableEditor = function () {
            self.editorEnabled = false;
        };

        self.save = function () {
            self.value = self.editableValue;
            self.disableEditor();
        };
        self.enableTagger = function (tags) {
            self.taggerEnabled = true;
            self.editableTag = tags;
        };

        self.disableTagger = function () {
            self.taggerEnabled = false;
        };

        self.tagSave = function () {
            self.value = self.editableTag;
            self.disableTagger();
        };
    }

})();
