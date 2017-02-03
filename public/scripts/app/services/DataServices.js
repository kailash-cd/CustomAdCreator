/**
 * Created by kailash on 27/10/16.
 */
define(['angular'], function(angular) {
    'use strict';


    var DataServices = angular.module('DataServices', []);

    DataServices.service('DataServices', ['$http', '$log',
        function ($http, $log) {

        return {
            listTemplates: function (userId, Success,Failure) {
                $http({
                    method: 'GET',
                    url: '/api/home' +"?id="+userId,
                }).then(Success,Failure);
            }
        }
    }])
    return DataServices;
});
