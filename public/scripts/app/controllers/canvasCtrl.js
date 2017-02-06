define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('canvasCtrl', []);
    newModule.controller('canvasCtrl', ['$scope', '$location','$log','DataServices','Util',
        function ($scope, $location,$log,DataServices,Util) {
            $log.info("At canvasCtrl");
            $scope.canvasJSON = {
                "buttonName":['headShot','clientLogo','description','banner','clickButton'],
                "booleans": 0,"widthCanvas":300,"heightCanvas":250,"colorPicker":"red","selectFont":"Roman","fontColor":"white","fontArt":['Algerian','Arial','Sans-Serif','Roboto','Verdana','Mamelon'],"fontSize":12,
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


            $scope.show=function (index) {
               $scope.canvasJSON.booleans = index;
            }

        }
    ])
    return newModule;
});