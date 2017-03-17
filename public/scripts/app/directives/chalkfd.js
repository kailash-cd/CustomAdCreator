/**
 * Created by kailash on 17/3/17.
 */
'use strict';

angular.module('chalkfd', []).
directive('chalkfd', ['$document','$log' , function($document,$log) {
    return {
            restrict: 'A',
        // require: '?mapId',
        scope: {
            enabledClick: '&',
            mapId: '=',
            mapOptions: '=',
            incorrectPoly: '=',
            enabled: '=',

        },
        link: function(scope, elm, attrs) {
            //map initialization FOR FREE DRAWING ---
            scope.incorrectPoly = 0;
            scope.mapOptions = {
                center: {lat: 40.781581302919285, lng: -74.15977478027344},
                zoom: 10
            };
            var map = new google.maps.Map(document.getElementById(scope.mapId),
                scope.mapOptions);
            google.maps.event.trigger(scope.mapId, 'resize');
            //map initialization FREE DRAWING ends ---
            // elm.css({position: 'absolute'});
            $log.debug("chalkfd::",scope.enabled);
            if(scope.enabled) {
                elm.bind('mousedown', function($event) {
                    return false;
                });
            } else {
                $log.info("Template width is greater than Ad canvas")
            }
        }
    };
}]);
