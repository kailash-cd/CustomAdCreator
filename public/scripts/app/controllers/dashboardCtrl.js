/**
 * Created by kailash on 23/11/16.
 */
define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('dashboardCtrl', []);
    newModule.controller('dashboardCtrl', ['$scope', '$location','$log','DataServices','Util',
        function ($scope, $location,$log,DataServices,Util) {
            $log.info("At dashboardCtrl");

        }
    ]);
    return newModule;
});