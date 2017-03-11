/**
 * Created by chalk on 10/3/17.
 */
/**
 * Created by kailash on 23/11/16.
 */
define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('poiCsvCtrl', []);
    newModule.controller('poiCsvCtrl', ['$scope', '$location','$log','DataServices','Util',
        function ($scope, $location,$log,DataServices,Util) {
            $log.info("At poiCsvCtrl");
              $scope.addresslist=[];
              $scope.address="";
            window.openFile=function (event) {
                 var file=event.target.files[0];
                var reader = new FileReader();
                var geoCode=new google.maps.Geocoder();
               reader.onload=function()
                {
                      var csvdata=reader.result;
                      var allTextlines=csvdata.split(/\r\n|\n/);
                      var headers=allTextlines[0].split(',');
                      for(var i=1;i<3;i++)
                      {    $scope.list=[];
                          var list=allTextlines[i].split(',');
                          $scope.address=list.toString();  $scope.addresslist[$scope.address]=$scope.list;

                          $log.info("address before",$scope.address);
                          geoCode.geocode({'address':$scope.address},function (results,status) {
                              if(status=='OK')
                              {
                                  $log.info("result",results);
                                  for(var k=0;k<results[0].address_components.length;k++)
                                  {
                                      $scope.list.push(results[0].address_components[k].types[0]);

                                  }


                                  $scope.addresslist[$scope.address]=$scope.list;
                                  $log.info("list",$scope.list);
                                  $log.info("addressList",$scope.addresslist);
                                  $log.info("address after",$scope.address);
                                  $scope.list=[];

                              }

                          });

                      }


                }

                reader.readAsText(file);
            }



            
            
            
            
            
        }
    ]);
    return newModule;
});