define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('canvasCtrl', []);
    newModule.controller('canvasCtrl', ['$scope', '$location','$log','DataServices','Util',
        function ($scope, $location,$log,DataServices,Util) {
            $log.info("At canvasCtrl");
            $scope.canvasJSON = {
                "buttonName":['headShot','clientLogo','description','banner','clickButton'],
                "booleans": 0,
                "domBoolsJSON":{
                    "enableTemplate":true,
                    "resizeEnableTemplate":false,
                },
                "widthCanvas":300,
                "heightCanvas":250,
                "colorPickerCanvasBackground":"red",
                "colorPickerFontColor":"black",
                "selectFont":"Roman",
                "fontColor":"white",
                "fontArt":['Algerian','Arial','Sans-Serif','Roboto','Verdana','Mamelon'],
                "fontSize":12,
                "errorMessage":"",
                "templateWidth":"",
                "templateHeight":"",
                // "templateName":[{tempName:'headShot.html',tempId:'temp1',number:0},
                //                 {tempName:'clientLogo.html',tempId:'temp2',number:1},
                //                  {tempName:'decription.html',tempId:'temp3',number:2},
                //                   {tempName:'banner.html',tempId:'temp4',number:3},
                //                   {tempName:'button.html',tempId:'temp5',number:4}]

            }
               $scope.editor=function(number)
               {
                  $scope.editorShow=number;


               }

                $scope.checkOut=function()
                {
                    var msg="";
                    if(parseInt($scope.canvasJSON.widthCanvas)>500 || parseInt($scope.canvasJSON.widthCanvas)<250)
                    {
                        msg="min to max width can be 250px to 500px";

                        $scope.canvasJSON.widthCanvas=300;


                    }
                     else
                    if(parseInt($scope.canvasJSON.heightCanvas)>500||parseInt($scope.canvasJSON.heightCanvas)<50)
                    {
                        msg="min to max height can be 50px to 500px ";
                        $scope.canvasJSON.heightCanvas=250;
                    }
                    else
                    {
                        document.getElementById("demo").innerText=msg;
                    }



                }
                  $scope.closeAlert=function()
                  {
                       $scope.canvasJSON.errorMessage="";
                  }
   /* here is variable height and width declaration*/

/*=================================================*/
            $scope.templateChecker=function (id) {
                var element = document.getElementById(id);
                var positionInfo = element.getBoundingClientRect();
                var height = positionInfo.height;
                var width = positionInfo.width;
                $log.info("height:"+height+" width:"+width);
                if(width<=500 && height<=500)
                {
                    $log.info("function is working");
                    $scope.canvasJSON.domBoolsJSON.enableTemplate=true;
                }
                else
                {
                    $scope.canvasJSON.domBoolsJSON.enableTemplate=false;
                    $scope.canvasJSON.errorMessage="template is too large";
                }


            }
            $scope.templateResizable=function(id)
            {
                var element = document.getElementById(id);
                var positionInfo = element.getBoundingClientRect();
                $log.info(
                    "dimensions",
                    positionInfo
                )
              //  var height = positionInfo.height;
                var width = positionInfo.width;
                $scope.canvasJSON.templateWidth=width;
                $scope.canvasJSON.templateHeight=height;

            }



            $scope.show=function (index) {
               $scope.canvasJSON.booleans = index;
            }


            /*waching function  for checking background and text color*/
            $scope.$watch("canvasJSON.colorPickerCanvasBackground",function () {
                $scope.canvasJSON.errorMessage = "";
                if($scope.canvasJSON.fontColor === $scope.canvasJSON.colorPickerCanvasBackground) {
                    $log.debug("font and canvas background color can not be same.");
                    $scope.canvasJSON.errorMessage = "font and canvas background color can not be same."
                    return 0;
                } else {
                    $scope.canvasJSON.canvasBackground = $scope.canvasJSON.colorPickerCanvasBackground
                }
            })
            $scope.$watch("canvasJSON.colorPickerFontColor",function () {
                $scope.canvasJSON.errorMessage = "";
                if($scope.canvasJSON.canvasBackground === $scope.canvasJSON.colorPickerFontColor) {
                    $log.debug("font and canvas background color can not be same.");
                    $scope.canvasJSON.errorMessage = "font and canvas background color can not be same."
                    return 0;
                } else {
                    $scope.canvasJSON.fontColor = $scope.canvasJSON.colorPickerFontColor
                }
            })

            //resize element code begins
            $scope.dynamicSize = {
                'width' : 350,
                'height' : 250
            }

            $scope.flexbox = true;
            $scope.size = {};
            $scope.msg = 'Resize me.';

            $scope.events = [];
            $scope.$on("angular-resizable.resizeEnd", function (event, args) {
                $scope.msg = 'Resize me again.';
                $scope.events.unshift(event);
                $scope.size = args;
                if(args.width)
                    $scope.dynamicSize.width = args.width;
                if(args.height)
                    $scope.dynamicSize.height = args.height;
            });
            $scope.$on("angular-resizable.resizeStart", function (event, args) {
                $scope.msg = 'Woooohoooo!';
                $scope.events.unshift(event);
            });
            //resize element code ends
            /*
            *   divlistener function for resize any div
            *   */
            $scope.divListener=function(divId)
            {
                $log.info("divId is ::: ",divId)
                if(divId =="maincanvas")
                 {
                     $log.info("div lister is working");
                     $scope.canvasJSON.domBoolsJSON.resizeEnableTemplate = true;
                     $log.info("$scope.canvasJSON.domBoolsJSON.resizeEnableTemplate ::: ",$scope.canvasJSON.domBoolsJSON.resizeEnableTemplate)
                 }
            }

        }
    ])
    return newModule;
});