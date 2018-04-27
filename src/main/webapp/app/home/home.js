define([
    'angular',
    'app/home/homeControllers',
    'app/home/homeServices'
    
], function(angular){
    'user strict';
    return angular.module('app.home',['app.homeControllers','app.homeServices'])
        .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
           console.log("app.home loaded");
        }]);
    
});