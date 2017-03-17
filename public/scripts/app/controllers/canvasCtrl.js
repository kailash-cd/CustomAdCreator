define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('canvasCtrl',["xeditable","angular-img-cropper"]);

    newModule.controller('canvasCtrl', ['$scope','$rootScope','$compile', '$location','$log','$timeout','DataServices','Util','$http',
        function ($scope,$rootScope,$compile, $location,$log,$timeout,DataServices,Util,$http) {
            $log.info("At canvasCtrl");
            $scope.canvasJSON = {

                "slideImage":['i1.png','i2.png','i3.png','i4.png'],
                "booleans": 0,
                "domBoolsJSON":{
                    "enableTemplate":true,
                    "resizeEnableTemplate":false
                },
                "openCroppableImage":false,
                "editableMessage":"write your message here and drag any where",
                "widthCanvas":450,
                "heightCanvas":350,
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
                "textBoxHeight":30,
                "textBoxWidth":300,
                "textBoxResizeId":"textBoxResizable-0",


            },
            $scope.dynamicSize = {
                'width' : 350,
                'height' : 250,
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
                    if(parseInt($scope.canvasJSON.widthCanvas)>450 || parseInt($scope.canvasJSON.widthCanvas)<250)
                    {
                        msg="min to max width can be 250px to 450px";
                        $scope.canvasJSON.widthCanvas=450;

                    }
                     else
                    if(parseInt($scope.canvasJSON.heightCanvas)>350||parseInt($scope.canvasJSON.heightCanvas)<50)
                    {
                        msg="min to max height can be 50px to 350px ";
                        $scope.canvasJSON.heightCanvas=350;
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
                  document.getElementById('maincanvas').style.backgroundImage="url()";
                  document.getElementById('maincanvas').style.backgroundColor="white";
              }
              /*image refresh function*/
              $scope.imageRefresh=function () {
                   $log.info("image refresh function is working");
                   $log.info($scope.canvasJSON.newImageId);
                  document.getElementById($scope.canvasJSON.newImageId).style.backgroundImage="url('./images/placeholder.png')";
              }

              /*createIdFunction start*/
                 $scope.createIdFunction=function(dynamicDivId)
                {
                    $log.info("new dynamic id",dynamicDivId);
                     $scope.canvasJSON.newImageId=dynamicDivId;
                     var i=document.getElementById(dynamicDivId);
                      $scope.i=i.getBoundingClientRect();
                     /* $scope.imageH=$scope.i.height;
                     $log.info("height",$scope.imageH);
                     $scope.imageW=$scope.i.width;
                     $log.info("width",$scope.imageW);*/
                }
              /*createidFunction end*/
            /*main canvas image upload*/
                $scope.imageUploadFunction=function (canvasLayerId) {
                    $log.info("file chooser is working");
                    $timeout(function () {
                        document.getElementById('imageId').click();
                    });

                    window.openFile = function (event) {
                        var file = event.target.files[0];

                        var reader = new FileReader();
                        reader.onload = function () {
                             var i=new Image();
                             i.src=reader.result;
                             i.setAttribute('id',"imgtag");
                            i.setAttribute('src',reader.result);
                            $log.info("clientWidth",i.width);
                            $log.info("clientHeight",i.height);

                             $log.info('image is',i);
                            $scope.bounds.right = i.width;
                            $scope.bounds.bottom = i.height;
                            $scope.canvasJSON.imagePath = reader.result;

                            document.getElementById(canvasLayerId).style.backgroundImage = "url(" + $scope.canvasJSON.imagePath + ")";
                        };
                        var imageUrl=reader.readAsDataURL(file);


                    };
                }

                /* create imagePlaceHolder function start*/
                   $scope.createPlaceHolder=function()
                   { $log.info("createPlaceHolder function is working");

                        $scope.canvasJSON.maincanvasHoverEnable=" ";
                        // $scope.canvasJSON.canvasLayer.push({
                        //                                     "layerType":"Image",
                        //                                     "layerId":$scope.canvasJSON.dynamicImageId,
                        //                                     "layerIndex":($scope.canvasJSON.canvasLayer.length+1)
                       // "layerData":""});
                        //             $log.info("layerId::",$scope.canvasJSON.canvasLayer.layerId);
                          $scope.canvasJSON.editToolkit=true;
                          $scope.canvasJSON.newImage=true;
                          $scope.canvasJSON.canvasLayer[0].images.push({"imageId":$scope.canvasJSON.newImageId,"type":"Image"});
                          $log.info("ImageId in Json::::",$scope.canvasJSON.canvasLayer[0].images);

                   }

            /* image crop  code start
             */
            $scope.cropper = {};

            $scope.cropper.sourceImage = null;
            $scope.cropper.croppedImage   = null;
            $scope.bounds = {};
            $scope.bounds.left =0;
            // $scope.bounds.right = 0;
            $scope.bounds.top = 0;
            // $scope.bounds.bottom = 200;
            $scope.cropImage=function () {
                $scope.openCroppableImage=true;
                $log.warn("cropheight",$scope.imageH);
                $scope.imageW=$scope.i.width;
                $log.warn("cropwidth",$scope.imageW);


            }
            /*watching for image crop*/

                $scope.$watch("cropper.croppedImage",function () {

                    var e=document.getElementById($scope.canvasJSON.newImageId);
                    if(e!=null) {
                        e.style.backgroundImage = "url(" + $scope.cropper.croppedImage + ")";
                    }

                });

            $scope.closeCroppableImage=function (event) {

                 if(event.target.id=="modelCrop")
                 {
                     $scope.openCroppableImage=false;
                 }
                 else
                     if(event.target.id=="buttonCrop")
                     {
                        $scope.openCroppableImage=false;
                     }

            }

            /*editable text code*/
            $scope.editableTextMessage=function () {
                $scope.canvasJSON.maincanvasHoverEnable=" ";
                $scope.canvasJSON.newTextBox=true;
                $scope.canvasJSON.editToolkit=true;
                $scope.canvasJSON.canvasLayer[0].text.push({"textBoxId":$scope.canvasJSON.newTextBoxId,"value":$scope.canvasJSON.editableMessage,formatting:{"backgroundColor":$scope.canvasJSON.fontBackgroundColor,"color":$scope.canvasJSON.fontColor,"size":$scope.canvasJSON.fontSize}});

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

                var checkNull=document.getElementById($scope.canvasJSON.textBoxResizeId);
                if(checkNull!=null) {
                    document.getElementById($scope.canvasJSON.textBoxResizeId).style.backgroundColor = $scope.canvasJSON.fontBackgroundColor

                    document.getElementById($scope.canvasJSON.textBoxResizeId).style.border="1px solid "+$scope.canvasJSON.fontBackgroundColor;
                }
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
                var checkNull=document.getElementById($scope.canvasJSON.newTextBoxId);
                if(checkNull!=null) {
                    document.getElementById($scope.canvasJSON.newTextBoxId).style.color = $scope.canvasJSON.fontColor
                }
            });
            /*font color change function end*/
            /*font size change function start*/
            $scope.$watch("canvasJSON.fontSize",function () {
                var checkNull=document.getElementById($scope.canvasJSON.newTextBoxId);
                if(checkNull!=null) {
                    document.getElementById($scope.canvasJSON.newTextBoxId).style.fontSize=$scope.canvasJSON.fontSize+"px";
                   // var result= $scope.canvasJSON.editableMessage.fontsize($scope.canvasJSON.fontSize);
                   //   document.getElementById($scope.canvasJSON.newTextBoxId).innerH  TML=result;

                    $log.info("fontsize",$scope.canvasJSON.fontSize);
                }
            });
            /*font size change function end*/
            /*font face change function start*/
            $scope.$watch("canvasJSON.selectFont",function () {

               var checkNull =document.getElementById($scope.canvasJSON.newTextBoxId);
                 if(checkNull!=null) {
                     document.getElementById($scope.canvasJSON.newTextBoxId).style.fontFamily = $scope.canvasJSON.selectFont
                 }
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
                var delTextBox=document.getElementById($scope.canvasJSON.textBoxResizeId);
                delTextBox.remove();

            }
            $scope.textBoxRefresh=function () {
                document.getElementById($scope.canvasJSON.textBoxResizeId).style.backgroundColor="transparent";
                document.getElementById($scope.canvasJSON.newTextBoxId).style.color="#2a7ccc";
                document.getElementById($scope.canvasJSON.textBoxResizeId).style.border="1px solid beige";


            }
            $scope.resizeBoxId=function(tbId)
            {
                 $scope.canvasJSON.textBoxResizeId=tbId;

            }
            $scope.$watch("textBoxHeight",function () {
                $log.info("height changed");
            });


        }
    ])
    return newModule;
});