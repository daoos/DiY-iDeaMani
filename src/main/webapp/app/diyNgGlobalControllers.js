/*****  GLOBAL CONTROLLERS *****/

define([
    'angular'
], function (angular){

    var diy_congrollers = angular.module('diyapp.controllers',[])
        .controller('GlobalHeaderController',['$scope','GlobalService', globalHeaderController])
        .controller('LeftNavController',['$scope','UserService', leftNavController])
    
    function globalHeaderController($scope,GlobalService){
        var mySelf = this;
        mySelf.client = {};
        mySelf.user = {};
        
        mySelf.client.clientLogoUrl = GlobalService.getClientLogoUrl();
        mySelf.client.clientName = GlobalService.getClientName();
        mySelf.user.avatar = GlobalService.getDefaultAvatar();
        mySelf.client.subTitle = GlobalService.getSubTitle();
        
        
    }
    
    function leftNavController($scope,UserService){
        var mySelf = this;
        var slide = false;
        
        mySelf.leftNavSettings = {}
        
        var data = {};
        
        function getUserLeftNavigation() {
            UserService.getLeftNavigation(data).then( function(data){
                mySelf.leftNavSettings = data;
            })
        }
        getUserLeftNavigation();
        
    }
    
    return diy_congrollers;
});