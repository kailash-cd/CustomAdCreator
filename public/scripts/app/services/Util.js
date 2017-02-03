/**
 * Created by kailash on 27/10/16.
 */
define(['angular'], function(angular) {
    'use strict';


    var Util = angular.module('Util', []);

    Util.service('Util', ['$http', '$log',
        function ($http, $log) {

            return {
                isVoid: function(obj){
                    switch(typeof(obj)){

                        case "undefined":
                        case "object":
                            for(var x in obj){
                                if(obj.hasOwnProperty(x))
                                    return false;
                                else
                                    return true;
                            }
                            return true;
                        case "number":
                        case "boolean":
                            return false;
                            break;
                        case "string":
                            if(obj == "")
                                return true;
                            else
                                return false;
                        default:
                            return false;
                    }
                },
                isEmailValid: function (email) {


                    if(this.isVoid(email)){
                        return false;
                    }else{
                        var atpos = email.indexOf("@");
                        var dotpos = email.lastIndexOf(".");
                        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                            return false;
                        } else {
                            return true;
                        }
                    }


                },
                isPhoneValid: function (phone) {
                    // $log.debug("phn is bfr string",phone)

                    var phnString=phone+""
                    var res = phnString.substring(0, 1);
                    // $log.debug("the first char is ",res)
                    if(res==="0"){
                        phnString= phnString.substring(1, phnString.length);
                    }else {
                        phnString=phnString;
                    }
                    // $log.debug("phn is ",phnString)
                    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,5})$/;
                    if(this.isVoid(phnString)){
                        return false;
                    }else {
                        if ((phnString.match(phoneno))) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                validateUrl: function (url)
                {

                    //    var regexp =  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                    //var regexp = new RegExp("^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
                    //var regexp =  /^(ftp|http|https):\/\/[^ "]+$/;
                    var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;

                    // var regexp =  /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                    // $log.info("url to validate is :",url);
                    if(!regexp.test(url))
                    {
                        // $log.debug("A invalid URL");

                        return true;
                    }
                    else {
                        // $log.debug("A valid URL");
                        return false;
                    }

                },
            }
        }])
    return Util;
});
