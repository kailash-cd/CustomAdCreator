define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('canvasCtrl', []);
    newModule.controller('canvasCtrl', ['$scope','$compile', '$location','$log','DataServices','Util',
        function ($scope,$compile, $location,$log,DataServices,Util) {
            $log.info("At canvasCtrl");
            $scope.canvasJSON = {
                "buttonName":['headShot','clientLogo','description','banner','clickButton'],
                "booleans": 0,
                "domBoolsJSON":{
                    "enableTemplate":true,
                    "resizeEnableTemplate":false
                },
                "openCroppableImage":false,

                "editableMessage":"",
                "editableTitle":"",
                "editableDescription":"",
                "widthCanvas":300,
                "heightCanvas":250,
                "colorPickerCanvasBackground":"red",
                "colorPickerFontColor":"white",
                "colorPickerFontBackgroundColor":"green",
                "selectFont":"Roman",
                "fontColor":"black",
                "fontBackgroundColor":"white",
                "fontArt":['Algerian','Arial','Sans-Serif','Roboto','Verdana','Mamelon'],
                "fontSize":12,
                "errorMessage":"",
                "templateWidth":"",
                "templateHeight":"",
                "imagePath":"",
                "imagePlaceHolder":"./images/placeholder.png",
                "newImage":false,
                "newImageId":"",
                "editToolkit":false,
                "maincanvasHoverEnable":"hover",
                "canvasLayer":[{}], //{ "layertype":"", "layerId":"", "layerIndex":"" }


            }

                 /*canvas size check function*/
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

                    }
                    document.getElementById("demo").innerText=msg;


                }
                /* pop up close funtion*/
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
            // $scope.$watch("canvasJSON.colorPickerFontColor",function () {
            //     $scope.canvasJSON.errorMessage = "";
            //     if($scope.canvasJSON.canvasBackground === $scope.canvasJSON.colorPickerFontColor) {
            //         $log.debug("font and canvas background color can not be same.");
            //         $scope.canvasJSON.errorMessage = "font and canvas background color can not be same."
            //         return 0;
            //     } else {
            //         $scope.canvasJSON.fontColor = $scope.canvasJSON.colorPickerFontColor
            //     }
            // })
            $scope.$watch("canvasJSON.colorPickerFontBackgroundColor",function () {
                $scope.canvasJSON.errorMessage = "";
                if($scope.canvasJSON.fontColor=== $scope.canvasJSON.colorPickerFontBackgroundColor) {
                    $log.debug("font and canvas background color can not be same.");
                    $scope.canvasJSON.errorMessage = "fontbackground and fontColor  can not be same."
                    return 0;
                } else {
                    $scope.canvasJSON.fontBackgroundColor = $scope.canvasJSON.colorPickerFontBackgroundColor
                }
            })
            $scope.$watch("canvasJSON.colorPickerFontColor",function () {
                $scope.canvasJSON.errorMessage = "";
                if($scope.canvasJSON.fontBackgroundColor=== $scope.canvasJSON.colorPickerFontColor) {
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
                     $scope.canvasJSON.domBoolsJSON.resizeEnableTemplate =true;
                     $log.info("$scope.canvasJSON.domBoolsJSON.resizeEnableTemplate ::: ",$scope.canvasJSON.domBoolsJSON.resizeEnableTemplate)
                 }
            }
            /* main canvas refresh*/
              $scope.mainCanvasRefresh=function()
              {
                  $log.info("main canvas refresh function is working");
                  document.getElementById('mainCanvasRefreshId').click();
              }
              /*createIdFunction start*/
                 $scope.createIdFunction=function(dynamicDivId)
                {   $log.info("new dynamic id",dynamicDivId);
                     $scope.canvasJSON.newImageId=dynamicDivId;
                }
              /*createidFunction end*/
            /*main canvas image upload*/
                $scope.imageUploadFunction=function (canvasLayerId) {
                    $log.info("file chooser is working");
                    document.getElementById('imageId').click();
                    window.openFile = function (event) {
                        var input = event.target;

                        var reader = new FileReader();
                        reader.onload = function () {
                            $scope.canvasJSON.imagePath = reader.result;

                            document.getElementById(canvasLayerId).style.backgroundImage = "url(" + $scope.canvasJSON.imagePath + ")";

                        };
                        reader.readAsDataURL(input.files[0]);
                    };
                }

                /* create imagePlaceHolder function start*/
                   $scope.createPlaceHolder=function()
                   { $log.info("createPlaceHolder function is working");
                       $scope.canvasJSON.maincanvasHoverEnable=" ";
                       var id = "Image"+($scope.canvasJSON.canvasLayer.length+1);
                       $scope.canvasJSON.canvasLayer.push({
                                                            "layerType":"Image",
                                                            "layerId":id,
                                                            "layerIndex":($scope.canvasJSON.canvasLayer.length+1) });
                                    $log.info("layerId::",$scope.canvasJSON.canvasLayer.layerId);
                          $scope.canvasJSON.editToolkit=true;
                       var dynamicImage = angular.element(document.createElement('dynamic'));

                       var el = $compile( dynamicImage )( $scope );

                       //where do you want to place the new element?
                       angular.element(document.getElementById('maincanvas')).append(dynamicImage);

                       $scope.insertHere = el;




                   }
                /*imageplaceHolderfucntionend*/
        /* image uploading code start*/


                   // window.openFile = function (event) {
                   //     var input = event.target;
                   //
                   //     var reader = new FileReader();
                   //     reader.onload = function () {
                   //         $scope.canvasJSON.imagePath = reader.result;
                   //         $scope.canvasJSON.imagePlaceHolder=$scope.canvasJSON.imagePath;
                   //         document.getElementById('maincanvas').style.backgroundImage = "url(" + $scope.canvasJSON.imagePlaceHolder + ")";
                   //
                   //     };
                   //     reader.readAsDataURL(input.files[0]);
                   // };

            /*image uploaded code end*/


            /* image crop  code start
             */
            $scope.cropper = {};
            $scope.cropper.sourceImage = null;
            $scope.cropper.croppedImage   = null;
            $scope.bounds = {};
            $scope.bounds.left = 0;
            $scope.bounds.right = 0;
            $scope.bounds.top = 0;
            $scope.bounds.bottom = 0;
            $scope.cropImage=function () {
                $scope.openCroppableImage=true;

            }
            $scope.closeCroppableImage=function () {
                $scope.openCroppableImage=false;
            }

        }
    ])
    return newModule;
});