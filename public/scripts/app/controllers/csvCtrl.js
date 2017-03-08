/**
 * Created by PARDEEP on 3/2/2017.
 */
define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('csvCtrl', []);
    newModule.controller('csvCtrl', ['$scope', '$location','$log','DataServices','Util','$http',
        function($scope, $location,$log,DataServices,Util,$http) {
            $log.info("Welcome CSV CTRL");
            $scope.addressList = [];
            $scope.dataHeader =[];
            $scope.tempHeader =[];
            $scope.addressContent =[];
            $scope.tempAddress ={};
            $scope.addressChunk =[];
            $scope.buttonName ="View/Edit Data"
            $scope.list =[];
            $scope.csvFile ={};
            $scope.fileHeader ={};
            var from = 0,toVal =0,  fileRow;

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
            /*file upload function*/
            $scope.fileUpload=function () {
                document.getElementById('fileToUpload').click();
            }

            /*            /!*progress bar function*!/
             $scope.progressBarReader=function (data) {
             $scope.buttonName ="Geo coding..."
             $log.info("progress bar called");
             var elm = document.getElementById('myBar');
             var w = 0;
             var interval = setInterval(speed, 10);
             function speed() {
             if(data.status!='failure') {
             document.getElementById('progressNumber').innerHTML=" ";
             if (w >= 100) {
             clearInterval(interval);
             var e= document.getElementById('progressNumber');
             e.style.marginLeft='520px'
             e.innerHTML = "<font id='progressFont' color='green'>Uploaded successfully</font>"
             $scope.$apply(function () {
             $scope.buttonName ="View/Edit Data";
             })
             setTimeout(function () {
             document.getElementById('progressFont').innerHTML="<font color='white'>loading....</font>";
             document.getElementById('myProgress').style.visibility="hidden";
             e.style.marginLeft='560px'
             e.style.visibility="hidden";
             elm.style.width=0;
             w=0;

             $log.info("file addressing",$scope.fileAddressing);

             },1000);


             }
             else {
             w++;
             elm.style.width = w + '%';
             document.getElementById('progressNumber').innerText = w + '%';
             }
             }else
             {
             document.getElementById('progressNumber').innerHTML="<font color='red'>failed<font>";
             }
             }
             }*/


            $scope.overLayClose =function (evt) {
                if(evt.target.id === "overlay"){
                    $scope.closeTable($scope.tableName)
                    resetDispalyField($scope.tableName);
                };

            }

            angular.element("body").on('keydown',function (e) {

                if(!angular.element("#overlay").hasClass("ng-hide") && e.which == 27 ){
                    resetDispalyField($scope.tableName);
                    $scope.tableShow =false;
                    angular.element("#overlay").addClass("ng-hide");
                    $log.info("Popup Closed");
                    $log.info("Esc Key Code Fired",e.which);
                };
            })

            /*table view function*/
            $scope.viewTable=function (fName) {
                angular.element("#overlay").removeClass("ng-hide");
                $scope.tableName =fName;
                $scope.viewList = $scope.csvFile[fName];
                getDisplayField(fName);
                $scope.tableShow =true;


            }


            function getDisplayField(field) {
                if(field != "Custom Data"){
                    for(var i=0;i<$scope.fileHeader[field].length;i++){
                        if($scope.fileHeader[field][i]=="business") {
                            $scope.showBussiness =true;
                        }
                        if($scope.fileHeader[field][i]=="street") {
                            $scope.showStreet =true;
                        }
                        if($scope.fileHeader[field][i]=="zip") {
                            $scope.showZip =true;
                        }
                        if($scope.fileHeader[field][i]=="city") {
                            $scope.showCity =true;
                        }
                        if($scope.fileHeader[field][i]=="state") {
                            $scope.showState =true;
                        }
                        if($scope.fileHeader[field][i]=="country") {
                            $scope.showCountry =true;
                        }
                    }
                }else {
                    $scope.showBussiness =true;
                    $scope.showStreet =true;
                    $scope.showZip =true;
                    $scope.showCountry =true;
                    $scope.showState =true;
                }
            }

            function resetDispalyField(field) {
                if(field != "Custom Data"){
                    $scope.showBussiness =false;
                    $scope.showStreet =false;
                    $scope.showZip =false;
                    $scope.showCountry =false;
                    $scope.showState =false;
                }
            }

            $scope.formatAddress =function(tempData){
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
                return stringHeader.toString()
            }
            $scope.makeKeyValue =function (key,values) {
                $log.info("Key ****",key,values)
                $scope.tempAddress[key] = values;
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

            $scope.addBlankRow =function (keyName) {
                $scope.csvFile[keyName].push({" ":""});
            }
            function getNextChunk ()
            {
                $log.info("You are in GetNextChunk");
                $log.info("toVal+++",toVal);
                $log.info("AdrCntnt+++",$scope.addressContent);
                if(toVal >= $scope.addressContent.length){
                    console.log("Total Value Is heigher",toVal ,$scope.addressContent.length);
                    $scope.csvFile[$scope.fileName] =  $scope.list;
                    $scope.fileHeader[$scope.fileName] =  $scope.dataHeader;

                    $scope.addressContent =[];
                    $scope.list =[];
                    $log.info($scope.csvFile);
                    $log.info($scope.fileHeader);
                    toVal = 0;
                    from =0;
                    document.getElementById("uploadBtn").className =' ';
                    return
                }else {
                    console.log(angular.element("#btnUpload"));
                    document.getElementById("uploadBtn").className ='m-progress';
                    console.log("toValue Incremented",toVal,"From value",from);
                    toVal = toVal + 100;
                }
                for (var i=from;i<toVal;i++)
                {
                    if($scope.addressContent[i]&& $scope.addressContent[i]!=undefined){
                        $scope.addressChunk.push($scope.addressContent[i]);
                    }
                }
                console.log("Address chunk",$scope.addressChunk,"to Value",toVal,"From value",from);
                getLatLong();
            }

            function getLatLong(){
                if (!$scope.lat && !$scope.long && $scope.addressChunk.length > 0) {

                    $http({
                        method: 'POST',
                        url: '/api/getApi',
                        data: {'locations': $scope.addressChunk},
                        headers: {"Content-Type": "application/json"},
                    }).success(function (data, status, header, config) {
                        $log.info("Geo Data",data);
                        /*   $scope.fileAddressing.push({"fileName":$scope.fileName,"fileRow":fileRow});*/
                        if(data["data"]){
                            $scope.formatAddress(data["data"]);
                        }
                        $scope.addressChunk =[];
                        from = toVal ;
                        getNextChunk();

                    }).error(function (data, status, header, config) {
                        $log.info("Geocode failed");
                        document.getElementById('progressNumber').innerHTML="<font color='red'>GeoCode failed<font>";

                    })
                }
            }
            $scope.addCustom = function () {
                $scope.customData ="notVisible"
                $scope.csvFile["Custom Data"] =[];
                $scope.viewTable("Custom Data");
            }
            $scope.removeRow = function (keyField,index) {
                $scope.csvFile[keyField].splice(index,1);
            }
            $scope.evaluateKeyField =function (dataAddressRow) {
                console.log("Custom row",dataAddressRow);
                var addressString =" ";
                if(!dataAddressRow.business && !dataAddressRow.street && !dataAddressRow.city && !dataAddressRow.state && !dataAddressRow.zip && !dataAddressRow.country ){
                    return
                }
                if(dataAddressRow.business){
                    addressString = addressString.concat(dataAddressRow.business +",")
                }
                if(dataAddressRow.street){
                    addressString = addressString.concat(dataAddressRow.street +",")
                }
                if(dataAddressRow.city){
                    addressString = addressString.concat(dataAddressRow.city +",")
                }
                if(dataAddressRow.state){
                    addressString = addressString.concat(dataAddressRow.state +",")
                }
                if(dataAddressRow.zip){
                    addressString = addressString.concat(dataAddressRow.zip +",")
                }
                if(dataAddressRow.country ){
                    addressString = addressString.concat(dataAddressRow.country+",")
                }
                return addressString;
            }
            $scope.closeTable = function (keyField) {
                resetDispalyField(keyField);
                var tempAdrsContent =[];
                for (var i =0;i<$scope.csvFile[keyField].length; i++) {
                    if (!$scope.csvFile[keyField][i].lat && !$scope.csvFile[keyField][i].long) {
                        var tempRow = " ";
                        tempRow = $scope.evaluateKeyField($scope.csvFile[keyField][i]);
                        if(tempRow !=undefined){
                            tempAdrsContent.push(tempRow);
                        }
                        console.log(tempAdrsContent);
                        if (tempAdrsContent[0] == undefined) {
                            $scope.tableShow = false;
                            return;
                        }
                    }
                }
                if (!$scope.lat && !$scope.long && tempAdrsContent.length > 0 && tempAdrsContent != undefined ) {
                    console.log("Address Contect Length :",tempAdrsContent.length);
                    console.log(keyField,"Progress class Added");
                    document.getElementById(keyField).className ='m-progress';

                    $http({
                        method: 'POST',
                        url: '/api/getApi',
                        data: {'locations': tempAdrsContent},
                        headers: {"Content-Type": "application/json"},
                    }).success(function (data, status, header, config) {
                        $log.info("Geo Data",data);
                        var latLongData =data["data"];
                        var keys = Object.keys(latLongData);
                        for (var i = 0; i<keys.length;i++){
                            console.log("Key Loop In progress.......")
                            for (var j = 0; j<tempAdrsContent.length;j++)  {
                                console.log("temp Content Loop In progress.......")
                                if(tempAdrsContent[j] == keys[i]){
                                    console.log("condiotion",keys[i]);
                                    for (var k = 0; k<$scope.csvFile[keyField].length;k++)  {
                                        var addressKey =  $scope.evaluateKeyField($scope.csvFile[keyField][k])
                                        if (addressKey ==keys[i]){
                                            document.getElementById(keyField).className =' ';

                                            console.log("key",keys[i]);
                                            console.log("address",addressKey);
                                            console.log("In progress.......")

                                            $scope.csvFile[keyField][k].lat = latLongData[keys[i]].split(",")[0];
                                            $scope.csvFile[keyField][k].long = latLongData[keys[i]].split(",")[1];
                                        }
                                    }
                                }
                            }
                        }

                    }).error(function (data, status, header, config) {
                        $log.info("Geo failed");
                    })

                }
                $scope.tableShow=false;
            }


            $scope.uplaodFile=function(evt){
                console.log("Files Upload Changed");
                if(!$scope.business&& !$scope.street&& !$scope.city&& !$scope.state && !$scope.country && !$scope.latitude && !$scope.long){
                    console.log("Every Thing is False");
                    $scope.business =true;
                    $scope.street =true;
                    $scope.city =true;
                    $scope.state =true;
                    $scope.zip =true;
                    $scope.selectHeader();
                }
                console.log(evt);
                var file= evt.target.files[0];
                $scope.fileName = file.name;
                $scope.fileExt = file.name.split(".")[1];

                if($scope.fileExt != "csv"){
                    $log.error("File Is Not CSV Type");
                    $scope.fileError = "File Is Not CSV Type"
                    return;
                }

                $log.info($scope.fileExt);

                var reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        $scope.addressList =  $scope.CSVToArray(e.target.result);
                        $log.info("-----CSV To JSON------",$scope.addressList);
                        var csvData=e.target.result;
                        var allTextLines=csvData.split(/\r\n|\n/);
                        fileRow=allTextLines.length-1;
                        /*
                         if($scope.addressList[0].length<$scope.dataHeader.length)
                         {
                         var error = document.getElementById('progressNumber');
                         error.innerHTML="<font color='red'>file formatting error<font>";

                         }
                         */
                        $log.info($scope.addressList.length);
                        if($scope.addressList.length > 0) {
                            document.getElementById("uploadBtn").className ='m-progress';
                            for (var i = 0; i < $scope.addressList.length; i++) {
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
                            getNextChunk();
                        }else {
                            document.getElementById('progressNumber').innerHTML="<font color='red'>File Is Empty<font>";
                            $log.error("File Is Empty");
                            return;
                        }

                    }
                    catch (error){
                    }

                };
                reader.readAsText(file);
            }
        }
    ]);
    return newModule;
});