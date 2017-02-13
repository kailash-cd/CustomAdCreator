
define([
    'angular',
    'angularRoute',
    'DataServices',
    'Util',
    'navbarCtrl',
    'dashboardCtrl',
    'canvasCtrl',
    'draggable',
    'domResizeCtrl',
    'resizable',
    'angular-img-cropper',

    

], function (angular) {
    'use strict';

    var mainApp =  angular.module('mainApp', [
        'ngRoute',
        'ngTouch',
        'DataServices',
        'Util',
        'navbarCtrl',
        'dashboardCtrl',
        'canvasCtrl',
        'draggable',
        'domResizeCtrl',
        'resizable',
        'angular-img-cropper',


    ]);

    
    mainApp.config(['$httpProvider',function ($httpProvider) {
    }]);

    /*mainApp.config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('cd')
            .setStorageType('sessionStorage')
            .setNotify(true, true)
    });
*/

    mainApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/home', {
                templateUrl: 'partials/auth/canvas.html',
                controller: 'canvasCtrl',
                access: { requiredLogin: false }
            }). when('/resizeTest', {
                templateUrl: 'partials/shared/resizableDemo.html',
                controller: 'domResizeCtrl',
                access: { requiredLogin: false }
            }).
                otherwise({
                    redirectTo: '/home'
                });
        }



    ]);


    mainApp.run(['$rootScope','$location',
        function($rootScope, $location) {
         $rootScope.app = {
                name: 'ChalkAds',
                description: 'Powered by ChalkDigital',
                year: ((new Date()).getFullYear()),
              };
            console.log("%c2. Application deployed successfully.\n"+"\t App Description: "+$rootScope.app.name+"\n \t"+$rootScope.app.description+"@"+$rootScope.app.year+"\n \t ==========================\n", "color: green; font-size:12px;");
    }]);

    return mainApp;


});




