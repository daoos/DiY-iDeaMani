/************ APP JS ***********/

define([
 'angular',
 'ui.router',
 'vis',
 'lib/config/diyng-config',
 'app/config/appConfig',    
 'app/diyNgGlobalControllers',
 'app/diyNgGlobalServices',
 'app/diyNgGlobalDirectives',
 'app/diyNgDiagramDirectives',    
 'app/organizations/org',
 'app/home/home',    
    
    
], function(angular){
   'use strict' ;
    
    var app = '';
    app = angular.module('app',[
        'ui.router',
        'app.global.directives',
        'app.canvasDrawing',
        'app.global.services',
        'diyapp.controllers',
        'diyapp.constants',
        'appSettings',
        'ui.bootstrap',
        'app.organizations',
        'app.home',
        ], function(){
        
        console.log("APP JS Loaded and Successfully executed default fn()...."); 
        
    });
    
    app.config(['$stateProvider', '$urlRouterProvider', 'DIY_SPA_ROUTES', function($stateProvider,$urlRouterProvider,DIY_SPA_ROUTES){
        
        $urlRouterProvider.otherwise('/');
        
         $stateProvider
            .state('myprofile1', {
                url: '/app/myprofile1',
                templateUrl: 'app/settings/user/myprofile.html',
                access: ""
            })
        
         .state('mysettings1', {
                url: '/app/mysettings1',
                templateUrl: 'app/settings/user/mysettings.html',
                access: ""
            })
        
            

        
        for(var spaRoute in DIY_SPA_ROUTES){
            if(DIY_SPA_ROUTES.hasOwnProperty(spaRoute)){
                var routeKey = spaRoute;
                var routeSettings= DIY_SPA_ROUTES[spaRoute];
                $stateProvider.state(spaRoute, routeSettings.route_details);
                
            }
            
        }
    }]);
    
    return app;
});