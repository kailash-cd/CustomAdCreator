define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('canvasCtrl',["xeditable"]);

    newModule.controller('canvasCtrl', ['$scope','$compile', '$location','$log','$timeout','DataServices','Util','$http',
        function ($scope,$compile, $location,$log,$timeout,DataServices,Util,$http) {
            $log.info("At canvasCtrl");
            $scope.canvasJSON = {
                "buttonName":['headShot','clientLogo','description','banner','clickButton'],
                "booleans": 0,
                "domBoolsJSON":{
                    "enableTemplate":true,
                    "resizeEnableTemplate":false
                },
                "openCroppableImage":false,
                "editableMessage":"write your message here and drag any where",
                "widthCanvas":300,
                "heightCanvas":250,
                "colorPickerCanvasBackground":"red",

                "colorPickerFontColor":"black",
                "colorPickerFontBackgroundColor":"#AARRGGBB",
                "selectFont":"Roman",
                "fontColor":"black",
                "fontOption":false,
                "fontSizeOption":false,
                "fontBackgroundColor":"white",
                "fontArt":['Algerian','Arial','Sans-Serif','Roboto','Verdana','Mamelon'],
                "fontSize":12,
                "errorMessage":"",
                "templateWidth":"",
                "templateHeight":"",
                "imagePath":"",
                "imagePlaceHolder":"./images/placeholder.png",
                "newImage":false,
                "newImageId":"image-0",
                "editToolkit":false,
                "maincanvasHoverEnable":"hover",
                "imageHoverEnable":"hover",
                "canvasLayer": [
                    {
                        "images": [],
                        "text":[]
                    }
                ],


                // "canvasLayer":
                //     [
                //         {"text":[{"id":1, "value":"This is test", formatting: {"font":"arial", size:12}},
                //             {"id":2, "value":"this is test2", formatting: {"font":"roboto", size:18}}]},
                //         {images: [{},{}]}
                //
                //     ],

                "imageWidth":400,
                "imageHeight":400,
                "newTextBox":false,
                "newTextBoxId":"textBox-0",

            }
            // $scope.canvasJSON.canvasLayer[0].images.push({id:1, type:"image", formatting:{font:"arial", size:"12px", color:"red"}});
            // {"text":[{"id":1, "value":"This is test", formatting: {"font":"arial", size:12}},
            // {"id":2, "value":"this is test2", formatting: {"font":"roboto", size:18}}]},
            // canvasLayer[0].text.push({id:3, value:canvasJson.editableMessage, formatting:{''}});
            // canvasLayer[0].text[$index].value
            // cavasLayer[0].text[$index].value


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
                {
                    $log.info("new dynamic id",dynamicDivId);
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
                        // $scope.canvasJSON.canvasLayer.push({
                        //                                     "layerType":"Image",
                        //                                     "layerId":$scope.canvasJSON.dynamicImageId,
                        //                                     "layerIndex":($scope.canvasJSON.canvasLayer.length+1) });
                        //             $log.info("layerId::",$scope.canvasJSON.canvasLayer.layerId);

                          $scope.canvasJSON.editToolkit=true;
                          $scope.canvasJSON.newImage=true;
                           // $scope.canvasJSON.count=$scope.canvasJSON.count+1;
                          $scope.canvasJSON.canvasLayer[0].images.push({"imageId":$scope.canvasJSON.newImageId,"type":"Image"});
                          $log.info("ImageId in Json::::",$scope.canvasJSON.canvasLayer[0].images);

                          // $log.info("layer Id",$scope.canvasJSON.canvasLayer.layerId);
                          // $log.info("layerType",$scope.canvasJSON.canvasLayer.layerType);

                   }

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
            /*editable text code*/
            $scope.editableTextMessage=function () {
                $scope.canvasJSON.maincanvasHoverEnable=" ";
                $scope.canvasJSON.newTextBox=true;
                $scope.canvasJSON.editToolkit=true;
                $scope.canvasJSON.canvasLayer[0].text.push({"textBoxId":$scope.canvasJSON.newTextBoxId,"value":$scope.canvasJSON.editableMessage,formatting:{"backgroundColor":$scope.canvasJSON.fontBackgroundColor,"color":$scope.canvasJSON.fontColor,"size":24}});

            }
            /*editable text code end*/
            /*font background color change function start*/
            $scope.openFontBackgroundChooser=function () {
                $timeout(function () {
                    var xxx=document.getElementById('fontBackground').click();
                });
                // document.getElementById($scope.canvasJSON.newTextBoxId).style.backgroundColor=$scope.canvasJSON.fontBackgroundColor;
            }
            $scope.$watch("canvasJSON.fontBackgroundColor",function () {
                document.getElementById($scope.canvasJSON.newTextBoxId).style.backgroundColor=$scope.canvasJSON.fontBackgroundColor
                 document.getElementById($scope.canvasJSON.newTextBoxId).style.border="1px solid "+$scope.canvasJSON.fontBackgroundColor;
            });
               /*font background color change function end*/
            /*editable text enable on image*/
            $scope.enableTextOnImage=function()
            {
                $scope.canvasJSON.imageHoverEnable=" ";

            }
            $scope.enableHoverOnImage=function()
            {
                $scope.canvasJSON.imageHoverEnable="hover";
            }
            /*main canvas background color change function  start*/
            $scope.mainCanvasBackgroundColor=function()
            {
                $timeout(function () {
                    document.getElementById('maincanvasbackground').click();
                });
               $log.info("This is maincanvasBackgroundFunction");

            }
            $scope.$watch("canvasJSON.canvasBackground",function () {
                document.getElementById('maincanvas').style.backgroundColor=$scope.canvasJSON.canvasBackground;
            });
            /*main canvas background color change function end*/
            /*font color change function start*/
            $scope.fontColorChange=function()
            {
                $timeout(function () {
                    document.getElementById('fontColor').click();
                });

            }
            $scope.$watch("canvasJSON.fontColor",function () {
                document.getElementById($scope.canvasJSON.newTextBoxId).style.color=$scope.canvasJSON.fontColor
            });
            /*font color change function end*/
            /*font size change function start*/
            $scope.$watch("canvasJSON.fontSize",function () {
                document.getElementById($scope.canvasJSON.newTextBoxId).style.fontSize=$scope.canvasJSON.fontSize;
            });
            /*font size change function end*/
            /*font face change function start*/
            $scope.$watch("canvasJSON.selectFont",function () {
                document.getElementById($scope.canvasJSON.newTextBoxId).style.fontFamily=$scope.canvasJSON.selectFont
            });
            /*font face change function end*/
            $scope.deleteImage=function(){
                var del=document.getElementById($scope.canvasJSON.newImageId);
                del.remove();
            }
            $scope.createTextBoxId=function (dynamicTextBoxId) {

                $scope.canvasJSON.newTextBoxId=dynamicTextBoxId;

            }
            $scope.deleteTextBox=function()
            {
                var delTextBox=document.getElementById($scope.canvasJSON.newTextBoxId);
                delTextBox.remove();

            }


        }
    ])
    return newModule;
});