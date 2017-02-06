define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('navbarCtrl', []);
    newModule.controller('navbarCtrl', ['$scope', '$location','$log','DataServices','Util','appData',
        function ($scope, $location,$log,DataServices,Util,appData) {
            $log.info("At navbar");

        }
    ]);
    return newModule;
});