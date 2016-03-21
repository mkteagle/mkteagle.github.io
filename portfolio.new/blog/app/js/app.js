(function() {
    angular.module('myApp',
        [
            'ngMaterial',
            'ui.router',
            'blogService',
            'blogController',
            'blogDirective',
            'firebase',
            'froala',
            'blogFilter',
            'ui.bootstrap',
            'truncate',
            'commentService',
            'loginController',
            'dirPagination',
            'md.data.table',
            'ui.bootstrap',
            'homeController'
        ])
        .constant('firebaseUrl', "https://doingutahdaily.firebaseio.com/")
        .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
        $urlRouterProvider.otherwise("/login");
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);
        $stateProvider
            .state('login', {
                url:'/login',
                templateUrl: './src/templates/login.html',
                controller: 'loginController as lc'
            })
            .state("home", {
                url: "/home",
                templateUrl: "./src/templates/home.html",
                controller: "HomeController"
            })
            .state("newhome", {
                url: "/newhome",
                templateUrl: "./src/templates/newhome.html"
            })
            .state("jen", {
                url: "/jen",
                templateUrl: "./src/templates/jen.html"
            })
            .state("post", {
                url: "/posts/:blogParam",
                templateUrl: "./src/templates/post.html",
                controller: "BlogController as uc"
            })
            .state("edit", {
                url: "/edit/:blogParam",
                templateUrl: "./src/templates/edit-post.html",
                controller: "BlogController as uc"
            })
            .state("editor", {
                url:"/editor",
                templateUrl: "./src/templates/editor.html",
                controller: "BlogController as uc"
            })
            .state("masterlist", {
                url:"/master",
                templateUrl: "./src/templates/masterlist.html",
                controller: "BlogController as uc"
            })
            .state("posts", {
                url: "/posts",
                templateUrl: "./src/templates/posts.html",
                controller: 'BlogController as uc'
            });

        // if none of the above states are matched, use this as the fallback

        //$locationProvider.html5Mode(true);
    });
})();

//
//});