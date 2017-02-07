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
                    "enableTemplate":"false"
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
                    if(parseInt($scope.canvasJSON.widthCanvas)>500)
                    {
                        msg="maximum width can be 500px";
                        $scope.canvasJSON.widthCanvas=300;


                    }
                     else
                    if(parseInt($scope.canvasJSON.heightCanvas)>500)
                    {
                        msg="maximum height can be 300px";
                        $scope.canvasJSON.heightCanvas=250;
                    }
                    else
                    {

                    }


                    document.getElementById("demo").innerText=msg;
                }
                  $scope.closeAlert=function()
                  {
                       $scope.canvasJSON.errorMessage="";
                  }

            $scope.templateChecker=function (id) {
                var element = document.getElementById(id);
                var positionInfo = element.getBoundingClientRect();
                var height = positionInfo.height;
                var width = positionInfo.width;
                $log.info("height:"+height+" width:"+width);
                if(width<=300 && height<=50)
                {
                    $log.info("function is working");
                    $scope.canvasJSON.domBoolsJSON.enableTemplate="true";

                }
                else
                {
                    $scope.canvasJSON.domBoolsJSON.enableTemplate="false";
                    $scope.canvasJSON.errorMessage="template is too large";
                }

            }


            $scope.show=function (index) {
               $scope.canvasJSON.booleans = index;
            }

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

        }
    ])
    return newModule;
});