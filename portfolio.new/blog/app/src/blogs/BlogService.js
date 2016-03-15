(function () {
    'use strict';

    angular.module('blogService', ['firebase'])
        .service('blogService', blogService);

    blogService.$inject = ['$firebaseArray', '$filter', '$firebaseAuth', '$firebaseObject', 'firebaseUrl', '$timeout', '$state'];

    function blogService($firebaseArray, $filter, $firebaseAuth, $firebaseObject, firebaseUrl, $timeout, $state) {
        var ref = new Firebase(firebaseUrl);
        var blogRef = new Firebase(firebaseUrl + '/blog');
        var date = Date.now();
        var newdate = $filter('date')(new Date(), 'HH:mm:ss');
        var self = this;
        self.authObj = $firebaseAuth(ref);
        self.blogs = $firebaseArray(blogRef);
        self.addBlog = addBlog;
        self.getChange = getChange;
        self.removeBlog = removeBlog;
        self.getPost = getPost;
        self.addPostParam = addPostParam;
        self.firebaseAuthLogin = firebaseAuthLogin;
        self.newUser = {};
        self.post = {};
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
        self.init = init;
        init();
        function init() {
            self.authObj.$onAuth(function (authData) {
                if (self.authObj.$getAuth()) {
                    self.id = authData.uid;
                    self.isLoggedIn = true;

                    self.user = $firebaseObject(ref.child('users').child(self.id));
                    self.user.$loaded().then(function () {
                        if (self.user.name == undefined) {
                            if (authData.google) {
                                self.newUser.name = authData.google.displayName;
                                self.newUser.img = authData.google.profileImageURL;
                                self.user.$ref().set(self.newUser);
                            }
                            if (authData.facebook) {
                                console.log(authData);
                                self.newUser.name = authData.facebook.displayName;
                                self.newUser.img = authData.facebook.profileImageURL;
                                self.user.$ref().set(self.newUser);
                            }
                        }
                    });
                }

            });
        }
        self.gameState = function () {
            self.user.$ref().child('blogs').update(self.recorded);
        };
        function addPostParam(blog) {
            var postParam = $filter('removeSpacesThenLowercase')(blog.title);
            blog.param = postParam;
            self.blogs.$save(blog);
        }
        function removeBlog(blog) {
            self.blogs.$remove(blog);
        }
        function getChange(blog) {
            self.blogs.$save(blog);
        }
        function getPost(blog) {
            self.blogs.$loaded()
                .then(function(){
                    angular.forEach(self.blogs, function(blogname) {
                        if (blogname.param === blog) {
                            self.post = blogname;
                            console.log(self.post);
                        }
                    })
                });
        }
        function addBlog() {
            self.blogs.$add({name: self.newUser.name, postDate: '', date: date, avatar: self.newUser.img, url: '/jen', content: '', title: 'Placeholder', category: '', location: '', season: '', county: '', posted: false});
        }
        function firebaseAuthLogin(provider) {
            self.authObj.$authWithOAuthPopup(provider).then(function (authData) {
                console.log("Authenticated successfully with provider " + provider + " with payload:", authData);
                $timeout(function() {
                    init();
                    //$ionicHistory.nextViewOptions({historyRoot: true});
                    $state.go('editor');
                })
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });

        }

        self.googleLogin = function () {
            self.firebaseAuthLogin('google');
        };
        self.facebookLogin = function () {
            self.firebaseAuthLogin('facebook');
        };

    }
})();
