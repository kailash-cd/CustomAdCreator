define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('tookit', []);
    newModule.directive('tookit',['$log', function($log) {
        return {
              restrict:"EA",
              templateUrl:function(element,attrs)
              {
                  $log.info("toolkit called :: ",attrs.role);
                  var url="";
                  switch(attrs.role)
                  {
                      case "maincanvas":
                          url= "/partials/shared/toolkit/maincanvas.html";
                          break;
                      case "image":
                          url =  "/partials/shared/toolkit/Image.html";
                          break;
                      default:
                          url =  "/partials/shared/toolkit/maincanvas.html";
                          break;
                  }
                  $log.info("toolkit template url ::",url);
                  return url;
              }
        }
    }]);
    return newModule;
});

