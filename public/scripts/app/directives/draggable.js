/**
 * Created by chalk on 6/2/17.
 */
'use strict';

angular.module('draggable', []).
directive('draggable', ['$document','$log' , function($document,$log) {
    return {
        // restrict: 'A',
        // require: '?enabled',
        scope: {
            enabledClick: '&',
            enabled: '='
        },
        link: function(scope, elm, attrs) {
            var startX, startY, initialMouseX, initialMouseY;
            elm.css({position: 'absolute'});
            $log.debug("dragable enabled status ::",scope.enabled);
            if(scope.enabled) {

                elm.bind('mousedown', function($event) {

                    startX = elm.prop('offsetLeft');
                    startY = elm.prop('offsetTop');
                    initialMouseX = $event.clientX;
                    initialMouseY = $event.clientY;
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                   /* $event.target.select();
                    $event.target.input();*/
                    

                    return false;
                });
            } else {
                $log.info("Template width is greater than Ad canvas")
            }

            function mousemove($event) {
                var dx = $event.clientX - initialMouseX;
                var dy = $event.clientY - initialMouseY;

                elm.css({
                    top:  startY + dy + 'px',
                    left: startX + dx + 'px'
                });
                return false;
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseu$event.target.p', mouseup);
            }


        }
    };
}]);