define([
    'angular'

], function (angular) {
    'use strict';


    var services =  angular.module('app.orgServices',[])

        .factory("OrganizationsFactory",['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
            var orgFactory = {};
            
            
            orgFactory.getOrganizations = function(data){
            	
            	return null;;
            }
        
            return orgFactory;
        }])


    return services;


});