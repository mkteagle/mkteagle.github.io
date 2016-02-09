var app = angular.module('myApp',
    [
        'ngMaterial',
        'ui.router',
        'blogService',
        'blogController',
        'blogDirective',
        'firebase',
        'oathService',
        'oathController',
        'ngSanitize',
        'froala',
        'blogFilter',
        'ui.bootstrap',
        'truncate'
    ]);
    app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
    $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "./assets/svg/menu.svg", 24)
        .icon("share", "./assets/svg/share.svg", 24)
        .icon("google_plus", "./assets/svg/google_plus.svg", 512)
        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
        .icon("twitter", "./assets/svg/twitter.svg", 512)
        .icon("phone", "./assets/svg/phone.svg", 512);

    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('blue');
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "./src/templates/home.html"
        })
        .state("login", {
            url: "/login",
            templateUrl: "src/templates/contentlogin.html"

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
            controller: 'BlogController'
        })
        .state("edit", {
            url: "/edit/:blogParam",
            templateUrl: "./src/templates/edit-post.html"
        })
        .state("posts", {
            url: "/posts",
            templateUrl: "./src/templates/posts.html",
            controller: 'BlogController'
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/home");
    //$locationProvider.html5Mode(true);

});