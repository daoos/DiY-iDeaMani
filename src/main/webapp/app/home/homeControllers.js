define([
    'angular'

], function (angular) {
    'use strict';

    var controllers =  angular.module('app.homeControllers',[])
        .controller('homeController', ['$rootScope','$scope', homeController])
        
    function homeController($rootScope,$scope) {
        
    	console.log("homeController :: Started");
        var vm = this;
    } //End of organizationController

    return controllers;

});
