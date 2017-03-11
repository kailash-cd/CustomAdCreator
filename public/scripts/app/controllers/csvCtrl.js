/**
 * Created by PARDEEP on 3/2/2017.
 */
define(['angular'],function(angular){
    'use strict';
    var newModule = angular.module('csvCtrl', []);
    newModule.controller('csvCtrl', ['$scope', '$location','$log','DataServices','Util','$http',
        function($scope, $location,$log,DataServices,Util,$http) {
            $log.info("Welcome CSV CTRL");
            $log.info("Welcome",window.innerHeight);
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
            $scope.csvFile["Custom Data"] =[{"":""}];
            $scope.fileHeader["Custom Data"] =["Business","Street","State","City","Zip","Country"];
            $scope.showCheckBox =false;
            var from = 0,toVal =0;
            console.log($scope.csvFile);
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
                $log.info("dataHeaders",$scope.dataHeader);

            }

            $scope.overLayClose =function (evt) {
                if(evt.target.id === "overlay"){
                    $scope.closeTable($scope.tableName)
                    resetDispalyField($scope.tableName);
                };
            }

            $scope.closePopup =function (evt) {
                console.log("target is" ,evt.target.id);
                if(evt.target.id == "main" || evt.target.id == undefined||evt.target.id == "Container"){
                    $scope.showCheckBox =false;
                    $log.info("Check Boxes Hide",$scope.showCheckBox);
                };
            }

            angular.element("body").on('keydown',function (e) {

                if(!angular.element("#overlay").hasClass("ng-hide") && e.which == 27 ){
                    resetDispalyField($scope.tableName);
                    $scope.tableShow =false;
                    $scope.showCheckBox =false;
                    angular.element("#overlay").addClass("ng-hide");
                    $log.info("Popup Closed");
                    $log.info("Esc Key Code Fired",e.which);
                };
            })

            /*table view function*/
            $scope.viewTable=function (fName) {
                $log.info("View Table For :",fName);
                angular.element("#overlay").removeClass("ng-hide");
                $scope.tableName =fName;
                $scope.viewList = $scope.csvFile[fName];
                getDisplayField(fName);
            }


            function getDisplayField(field) {
                $log.info("Get Display Field Called For :",$scope.fileHeader);
                resetDispalyField(field);
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
                    $scope.showCity =true;
                }
                /*                safeApply();*/
                $scope.tableShow =true;
                console.log("Displaying","Business",$scope.showBussiness,"Street",$scope.showStreet,"Zip:",$scope.showZip,"COUNTRY" ,$scope.showCountry,"state",$scope.showState)
            }

            function resetDispalyField(field) {
                console.log("Reseting",field);
                if(field != "Custom Data"){
                    $scope.showBussiness =false;
                    $scope.showStreet =false;
                    $scope.showZip =false;
                    $scope.showCountry =false;
                    $scope.showCity =false;

                }
                $scope.showCheckBox =false;
            }

            $scope.formatAddress =function(tempData){
                var keys = Object.keys(tempData);
                var addresskeys = Object.keys($scope.tempAddress);
                var address ={};
                for(var i=0;i<keys.length; i++){
                    for(var j=0;j<addresskeys.length; j++){
                        if(addresskeys[j].toLowerCase() === keys[i].toLowerCase()){
                            if(parseFloat(tempData[keys[i]].split(",")[0])==0.0){
                                address.lat="";
                            }else {
                                address.lat=parseFloat(tempData[keys[i]].split(",")[0]);
                            }

                            if(parseFloat(tempData[keys[i]].split(",")[1])==0.0){
                                address.long="";
                            }else {
                                address.long=parseFloat(tempData[keys[i]].split(",")[1]);
                            }

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
                    $scope.dataHeader=[];
                    $scope.addressContent =[];
                    $scope.list =[];
                    $log.info($scope.csvFile);
                    $scope.fileProgress="";
                    showMsg("File Uploaded Successfully","success");
                    $log.info($scope.fileHeader);
                    toVal = 0;
                    from =0;
                    /*                    document.getElementById("uploadBtn").className =' ';*/
                    return
                }else {
                    showMsg("Please Wait While Uploading..","progress");
                    console.log(angular.element("#btnUpload"));
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
                }else {

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
                        if(tempRow != undefined){
                            tempAdrsContent.push(tempRow);
                        }
                        console.log(tempAdrsContent);
                    }
                }
                if (tempAdrsContent[0] == undefined) {
                    $scope.tableShow = false;
                    return;
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
                                            if(parseFloat(latLongData[keys[i]].split(",")[0]) == 0.0){
                                                $scope.csvFile[keyField][k].lat ="";
                                            }else {
                                                $scope.csvFile[keyField][k].lat = parseFloat(latLongData[keys[i]].split(",")[0]);
                                            }
                                            if(parseFloat(latLongData[keys[i]].split(",")[1]) == 0.0){
                                                $scope.csvFile[keyField][k].long ="";
                                            }else {
                                                $scope.csvFile[keyField][k].long = parseFloat(latLongData[keys[i]].split(",")[1]);
                                            }
                                            /*                                                  $scope.csvFile[keyField][k].lat = parseFloat(latLongData[keys[i]].split(",")[0]);
                                             $scope.csvFile[keyField][k].long = parseFloat(latLongData[keys[i]].split(",")[1]);*/
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

            $scope.showHeaders =function () {
                console.log("show Header Clicked")
                if($scope.showCheckBox){
                    $scope.showCheckBox =false;
                    console.log("CheckBox Visible")
                }else {
                    console.log("CheckBox are Not Visible")
                    $scope.showCheckBox =true;
                }
            }

            function safeApply() {
                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                    $scope.$apply();
                }
            }

            function showMsg(text,type) {
                console.log("Show",type,"Msg" );
                if(type ==="error"){
                    $scope.fileError=text;
                    safeApply();
                    console.log($scope.fileError);
                    setTimeout(function () {
                        $scope.fileError="";
                        safeApply();
                    },2000)
                }
                if(type ==="progress"){
                    $scope.fileProgress=text;

                }
                if(type ==="success"){
                    safeApply();
                    $scope.fileSuccess=text;
                    setTimeout(function () {
                        $scope.fileSuccess="";
                        safeApply();
                    },2000)
                }
            }

            function checkFile(fileName,fileExt,fileData,fileHeader) {
                if(fileExt != "csv"){
                    $log.info("File Is Not CSV Type");
                    showMsg("File Is Not CSV Type","error");
                    return;
                }
                if (fileData !=undefined && fileData.length >0){
                    $log.info("Checking Files");
                    if(fileData[0].length < fileHeader.length)
                    {
                        console.log(fileData.length < fileHeader.length);
                        $log.info("data Header",fileHeader.length);
                        $log.info("addressList[0]",fileData.length);
                        console.log("File Header Is Invalid");
                        showMsg("Header Mismatch","error");
                        return;
                    }
                }else{
                    $log.info("File Length",fileData.length);
                    showMsg("No Records To Process","error");
                    console.log("File Is Empty");
                    return;
                }
            }
            var uplaodFile =function (evt){
                console.log("Files Upload Changed");
                $scope.showCheckBox =false;
                if(!$scope.business&& !$scope.street&& !$scope.city&& !$scope.state && !$scope.country && !$scope.latitude && !$scope.long){
                    console.log("Every Thing is False");
                    $scope.country =true;
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
                $log.info($scope.fileExt);
                var reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        $scope.addressList =  $scope.CSVToArray(e.target.result);
                        $log.info("-----CSV To JSON------",$scope.addressList);
                        var csvData=e.target.result;
                        checkFile($scope.fileName,$scope.fileExt,$scope.addressList,$scope.dataHeader);

                        if($scope.business && $scope.street && $scope.city && $scope.state && $scope.country && $scope.lat && $scope.long && $scope.addressList[0].length ==8){
                            $log.info("All Header Present");
                            var list =[]
                            for(var i=0;i<$scope.addressList.length;i++){
                                var fileRow =$scope.addressList[i];
                                list.push({business:fileRow[0],street:fileRow[1],city:fileRow[2],state:fileRow[3],zip:fileRow[4],country:fileRow[5],lat:parseFloat(fileRow[6]),long:parseFloat(fileRow[7])})
                                console.log("List Parsing :",list);
                            }
                            $scope.csvFile[$scope.fileName ]=list;
                            $scope.fileHeader[$scope.fileName ] =["business","street","state","city","zip","country","latitude","longitude"];
                            console.log($scope.csvFile);
                            console.log("Exiting All Header");
                            safeApply();
                            return;
                        }
                        console.log($scope.addressList[0].length < $scope.dataHeader.length);
                        $log.info("data Header",$scope.dataHeader.length);
                        $log.info("addressList[0]",$scope.addressList[0].length);
                        $log.info($scope.addressList.length);
                        if($scope.addressList.length > 0) {
                            /!*   document.getElementById("uploadBtn").className ='m-progress';*!/
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
                        }
                    }
                    catch (error){
                        console("Exception Occured while Reading");
                    }

                };
                reader.readAsText(file);
            }
            $scope.fileUpload=function () {
                $scope.showCheckBox =false;
                var x = document.createElement("INPUT");
                x.setAttribute("type", "file");
                x.setAttribute("id", "fileToUpload");
                x.setAttribute("accept", ".csv");
                x.click();
                x.addEventListener(
                    'change',
                    uplaodFile,
                    false
                );


            }
        }
    ]);
    return newModule;
});