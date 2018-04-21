define([
    'angular',
    'app/organizations/orgControllers',
    'app/organizations/orgServices'
    
], function(angular){
    'user strict';
    return angular.module('app.organizations',['app.orgControllers','app.orgServices'])
        .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
           console.log("app.organizations loaded");
        }]);
    
});