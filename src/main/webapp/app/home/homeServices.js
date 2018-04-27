define([
    'angular'

], function (angular) {
    'use strict';

    var services =  angular.module('app.homeServices',[])
    .factory("HomeFactory",['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
            var homeFactory = {};
            homeFactory.getHomeContent = function(data){
            	return null;;
            }
         
            return homeFactory;
        }])

    return services;


});