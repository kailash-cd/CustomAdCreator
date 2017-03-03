/**
 * Created by PARDEEP on 3/2/2017.
 */
'use-strict'
define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('csvCtrl', []);
    newModule.controller('csvCtrl', ['$scope', '$location','$log','DataServices','Util','$http',
        function ($scope, $location,$log,DataServices,Util,$http) {
            $log.info("Welcome CSV CTRL");
            $scope.fileExt =" ";
            $scope.addressList = [];
            $scope.dataHeader =[];
            $scope.tempHeader =[];
            $scope.tempAddrList=[];
            $scope.addressContent =[];
            $scope.tempAddress ={};
            $scope.custAddress =[];

            $scope.selectHeader = function (){
                if($scope.business){
                    if($scope.dataHeader.indexOf("business") == -1){
                        $scope.dataHeader.push("business");
                        $scope.tempHeader.push({field:"business",id:0})
                    }
                }else{
                    if($scope.dataHeader.indexOf("business") != -1){
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("business"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"business");
                    }
                }
                if($scope.street){
                    if($scope.dataHeader.indexOf("street") == -1){
                        $scope.dataHeader.push("street");
                        $scope.tempHeader.push({field:"street",id:1})
                    }
                }else{
                    if($scope.dataHeader.indexOf("street") != -1){
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("street"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"street");
                    }
                }

                if($scope.state){
                    if($scope.dataHeader.indexOf("state") == -1){
                        $scope.dataHeader.push("state");
                        $scope.tempHeader.push({field:"state",id:2})
                    }
                }else{
                    if($scope.dataHeader.indexOf("state") != -1){
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("state"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"state");
                    }
                }

                if($scope.city){
                    if($scope.dataHeader.indexOf("city")  == -1){
                        $scope.dataHeader.push("city");
                        $scope.tempHeader.push({field:"city",id:3})
                    }
                }else{
                    if($scope.dataHeader.indexOf("city")  != -1){
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("city"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"city");
                    }
                }
                if($scope.zip){
                    if($scope.dataHeader.indexOf("zip")  == -1){
                        $scope.tempHeader.push({field:"zip",id:4})
                        $scope.dataHeader.push("zip");
                    }
                }else{
                    if($scope.dataHeader.indexOf("zip")  != -1){
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("zip"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"zip");
                    }
                }

                if($scope.country){
                    if($scope.dataHeader.indexOf("country")  == -1){
                        $scope.tempHeader.push({field:"country",id:5})
                        $scope.dataHeader.push("country");
                    }
                }else {
                    if ($scope.dataHeader.indexOf("country") != -1) {
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("country"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"country");
                    }
                }
                if($scope.lat){
                    if($scope.dataHeader.indexOf("latitude")  == -1){
                        $scope.tempHeader.push({field:"latitude",id:6})
                        $scope.dataHeader.push("latitude");
                    }
                }else {
                    if ($scope.dataHeader.indexOf("latitude") != -1) {
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("latitude"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"latitude");
                    }
                }
                if($scope.long){
                    if($scope.dataHeader.indexOf("longitude")  == -1){
                        $scope.tempHeader.push({field:"longitude",id:7})
                        $scope.dataHeader.push("longitude");
                    }
                }else{
                    if($scope.dataHeader.indexOf("longitude")  != -1){
                        $scope.dataHeader.splice($scope.dataHeader.indexOf("longitude"),1);
                        $scope.tempHeader = $scope.spliceTmpAry($scope.tempHeader,"longitude");
                    }
                }

                $log.info($scope.dataHeader);
                $scope.tempHeader =$scope.tempHeader.sort(function(a, b) {
                    return parseFloat(a.id) - parseFloat(b.id);
                });

                console.log($scope.tempHeader);
                $scope.dataHeader = $scope.setHeader($scope.tempHeader);
                $log.info($scope.dataHeader);

            }

            $scope.formatAddress =function(tempData){
                $scope.list =[];
                var keys = Object.keys(tempData);
                var addresskeys = Object.keys($scope.tempAddress);
                var address ={};
                for(var i=0;i<keys.length; i++){
                    for(var j=0;j<addresskeys.length; j++){
                        if(addresskeys[j].toLowerCase() === keys[i].toLowerCase()){
                            address.lat=tempData[keys[i]].split(",")[0];
                            address.long=tempData[keys[i]].split(",")[1];
                            for(var l=0;l<$scope.tempAddress[addresskeys[j]].length;l++){
                                if($scope.tempAddress[addresskeys[j]][l].field == "business"){
                                    address.business =$scope.tempAddress[addresskeys[j]][l].value;
                                }
                                if($scope.tempAddress[addresskeys[j]][l].field == "street"){
                                    address.street =$scope.tempAddress[addresskeys[j]][l].value;
                                }
                                if($scope.tempAddress[addresskeys[j]][l].field == "city"){
                                    address.city =$scope.tempAddress[addresskeys[j]][l].value;
                                }
                                if($scope.tempAddress[addresskeys[j]][l].field == "state"){
                                    address.state =$scope.tempAddress[addresskeys[j]][l].value;
                                }
                                if($scope.tempAddress[addresskeys[j]][l].field == "zip"){
                                    address.zip =$scope.tempAddress[addresskeys[j]][l].value;
                                }
                                if($scope.tempAddress[addresskeys[j]][l].field == "country"){
                                    address.country =$scope.tempAddress[addresskeys[j]][l].value;
                                }
                            }
                        }
                    }
                    $scope.list.push(address);
                    address ={};
                }
                $log.info("********Address********",$scope.list);
            }

            $scope.spliceTmpAry =function (tempHeader,fieldName) {
                if(tempHeader.length > 0 && fieldName != undefined){
                    for(var i=0;i<tempHeader.length;i++){
                        if(tempHeader[i].field === fieldName){
                            tempHeader.splice(i,1)
                        }
                    }
                    return tempHeader;
                }
            }

            $scope.setHeader =function (tempHeader) {
                var dataHeader =[]
                if(tempHeader.length>0){
                    for(var i =0;i<tempHeader.length;i++){
                        dataHeader.push(tempHeader[i].field)
                    }
                }
                return dataHeader
            }


            $scope.setAddress =function(tempHeaders,gt) {
                var stringHeader =[]
                if(tempHeaders.length>0){
                    for(var i =0;i<tempHeaders.length;i++){
                        stringHeader.push(tempHeaders[i][gt].toString())
                    }
                }
                // $log.info("stringHeader++",stringHeader);
                return stringHeader.toString()
            }
            $scope.makeKeyValue =function (key,values) {
                $log.info("Key ****",key,values)
                $scope.tempAddress[key] = values;
                // $log.info("Key Value****",$scope.tempAddress);

            }

            $scope.CSVToArray=function( strData, strDelimiter ) {
                // Check to see if the delimiter is defined. If not,
                // then default to comma.
                strDelimiter = (strDelimiter || ",");
                // Create a regular expression to parse the CSV values.
                var objPattern = new RegExp(
                    (
                        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                    ),
                    "gi"
                );
                // Create an array to hold our data. Give the array
                // a default empty first row.
                var arrData = [[]];
                // Create an array to hold our individual pattern
                // matching groups.
                var arrMatches = null;
                // Keep looping over the regular expression matches
                // until we can no longer find a match.
                while (arrMatches = objPattern.exec(strData)) {
                    // Get the delimiter that was found.
                    var strMatchedDelimiter = arrMatches[1];
                    // Check to see if the given delimiter has a length
                    // (is not the start of string) and if it matches
                    // field delimiter. If id does not, then we know
                    // that this delimiter is a row delimiter.
                    if (
                        strMatchedDelimiter.length &&
                        (strMatchedDelimiter != strDelimiter)
                    ) {
                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push([]);
                    }
                    // Now that we have our delimiter out of the way,
                    // let's check to see which kind of value we
                    // captured (quoted or unquoted).
                    if (arrMatches[2]) {
                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        var strMatchedValue = arrMatches[2].replace(
                            new RegExp("\"\"", "g"),
                            "\""
                        );
                    } else {
                        // We found a non-quoted value.
                        var strMatchedValue = arrMatches[3];
                    }
                    // Now that we have our value string, let's add
                    // it to the data array.
                    arrData[arrData.length - 1].push(strMatchedValue.trim());
                }
                // Return the parsed data.
                var arrayCheckString = '';
                return ( arrData.filter(function (v) {
                    arrayCheckString = '';
                    v.forEach(function (v) {
                        arrayCheckString += v;
                    });
                    return (arrayCheckString.trim() != '');
                }) );
            }
            $scope.uplaodFile=function(evt){
                console.log("Files Upload Changed");
                console.log(evt);
                var file= evt.target.files[0];
                $scope.fileExt = file.name.split(".")[1];
                if($scope.fileExt != "csv"){
                    $log.error("File Is Not CSV Type");
                    return;
                }
                $log.info($scope.fileExt);

                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.addressList =  $scope.CSVToArray(e.target.result);
                    $log.info("-----CSV To JSON------",$scope.addressList);
                    $log.info($scope.addressList.length);
                    if($scope.addressList.length > 0) {
                        for (var i = 1; i < $scope.addressList.length; i++) {

                            $log.info($scope.addressList[i]);
                            if ($scope.business) {
                                $log.info($scope.dataHeader.indexOf("business"));
                                $scope.tempHeader[$scope.dataHeader.indexOf("business")].value = $scope.addressList[i][$scope.dataHeader.indexOf("business")];
                            }
                            if ($scope.street) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("street")].value = $scope.addressList[i][$scope.dataHeader.indexOf("street")];
                            }
                            if ($scope.city) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("city")].value = $scope.addressList[i][$scope.dataHeader.indexOf("city")];
                            }
                            if ($scope.state) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("state")].value = $scope.addressList[i][$scope.dataHeader.indexOf("state")];
                            }
                            if ($scope.zip) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("zip")].value = $scope.addressList[i][$scope.dataHeader.indexOf("zip")];
                            }
                            if ($scope.country) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("country")].value = $scope.addressList[i][$scope.dataHeader.indexOf("country")];
                            }
                            if ($scope.lat) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("latitude")].value = $scope.addressList[i][$scope.dataHeader.indexOf("latitude")];
                            }
                            if ($scope.long) {
                                $scope.tempHeader[$scope.dataHeader.indexOf("longitude")].value = $scope.addressList[i][$scope.dataHeader.indexOf("longitude")];
                            }

                            $scope.addressContent.push($scope.setAddress($scope.tempHeader, "value"));
                            $scope.makeKeyValue($scope.setAddress($scope.tempHeader, "value"), JSON.parse(JSON.stringify($scope.tempHeader)));
                        }
                        $log.info("Final Content", $scope.addressContent);

                        if (!$scope.lat && !$scope.long) {
                            $http({
                                method: 'POST',
                                url: '/api/getApi',
                                data: {'locations': $scope.addressContent},
                                headers: {"Content-Type": "application/json"},
                            }).success(function (data, status, header, config) {
                                $log.info("Geo Data");
                                $log.info(data);
                                $scope.formatAddress(data["data"]);

                            }).error(function (data, status, header, config) {
                                $log.info("Geo failed");
                            })

                        } else {
                            $log.error("File Is Empty");
                            return;
                        }
                    }
                };
                reader.readAsText(file);
            }

        }
    ]);
    return newModule;
});