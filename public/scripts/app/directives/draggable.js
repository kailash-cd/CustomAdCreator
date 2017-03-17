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
            var startX, startY, initialMouseX, initialMouseY,widthDifference,heightDifference;
            elm.css({position: 'absolute'});
            $log.debug("dragable enabled status ::",scope.enabled);
            if(scope.enabled) {

                elm.bind('mousedown', function($event) {

                    startX = elm.prop('offsetLeft');

                    widthDifference=document.getElementById('maincanvas').clientWidth-elm[0].childNodes[1].clientWidth;
                    startY = elm.prop('offsetTop');
                    heightDifference=document.getElementById('maincanvas').clientHeight-elm[0].childNodes[1].clientHeight;
                    initialMouseX = $event.clientX;
                    initialMouseY = $event.clientY;
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                    $event.target.select();



                    return false;
                });
            } else {
                $log.info("Template width is greater than Ad canvas")
            }

            function mousemove($event) {
                var dx = $event.clientX - initialMouseX;
                var dy = $event.clientY - initialMouseY;
                if(((startX+dx<=widthDifference && startX+dx>=0) && (startY+dy<=heightDifference && startY+dy>=0))) {
                          elm.css({

                              top: startY + dy + 'px',
                              left: startX + dx + 'px',

                          });
                      }
                          return false;


            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseu$event.target.p', mouseup);
            }


        }
    };
}]);