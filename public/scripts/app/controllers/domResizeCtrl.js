
define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('domResizeCtrl', []);
    newModule.controller('domResizeCtrl', ['$scope','$log',
        function($scope,$log) {
            $log.info("Hi I am at domResizeCtrl");
            $scope.dynamicSize = {
                'width' : 350,
                'height' : 250,
            }
            $scope.size = {};
            $scope.flexbox = true;

            $scope.events = [];
            $scope.$on("angular-resizable.resizeEnd", function (event, args) {
                $scope.events.unshift(event);
                $scope.size = args;
                if(args.width)
                    $scope.dynamicSize.width = args.width;
                if(args.height)
                    $scope.dynamicSize.height = args.height;
            });
            $scope.$on("angular-resizable.resizeStart", function (event, args) {
                $scope.events.unshift(event);
            });
        }]);
    return newModule;
});
