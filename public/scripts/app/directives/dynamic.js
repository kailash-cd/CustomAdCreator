define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('dynamic', []);
    newModule.directive('dynamic',['$log', function($log) {
        $log.info("dymicImage directive is working");
        return {

            restrict:"E",
            templateUrl:"/partials/shared/dynamicImage.html",

        }
    }]);
    return newModule;
});

/**
 * Created by chalk on 17/2/17.
 */
