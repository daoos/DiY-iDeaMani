/******** ROOT nG*********/

define([
    'jquery',
    'require',
    'app/app',
    'angular',
    'deferredBootstrapper',
    'ui.bootstrap.tpls'
], function (jquery,require,angular) {
    'use strict';
        
    bootstrapDiyNgApp();
    
    
    function bootstrapDiyNgApp() {
        console.log("If you see this means bootstrapDiyNgApp bootstrapped process success...");
        
        var clientAppSettings = {};
        require(['domReady!','jquery.slimscroll','deferredBootstrapper','less'],function(document,slimscroll,deferredBootstrapper){
            deferredBootstrapper.bootstrap({
               element: document,
               module: 'app',
               resolve: {
                   CLIENT_APP_SETTINGS: ['$http', function($http){
                       var appSetting =  $http.get('./app/config/appSettings.json');
                       console.log("appSetting ::",appSetting);
                       clientAppSettings = appSetting;
                       return appSetting;
                   }],
                   DIY_SPA_ROUTES: ['$http','$q','$timeout', function($http,$q,$timeout){
                       
                       var deferredPromise  = $q.defer();
                       $timeout(function (){
                                    $http.get('./app/config/appSpaRoutingSettings.json').then(function (serverResp){
                                        deferredPromise.resolve(serverResp);
                                        console.log("DIY_SPA_ROUTES ::", serverResp);
                                    });
                        }, 300);
                        return deferredPromise.promise;
                   }],
                   CLIENT_SETTINGS: ['$http', function($http){
                        var configPath          = "./app/config/";
                        var clientAppSettings   = "clientSettings.json";
                        var clientId            = "DEMO";
                        var clientSettings            = "";

                        if(clientAppSettings.config_path){
                            configPath = CLIENT_APP_SETTINGS.config_path; 
                        }

                        if(clientAppSettings.client_id){
                            clientId = CLIENT_APP_SETTINGS.client_id;
                        }
                        if(clientAppSettings.client_app_settings){
                            clientAppSettings = CLIENT_APP_SETTINGS.client_app_settings;
                        }
                        clientSettings = configPath+clientId+"/"+clientAppSettings;
                        var clientAppSetting =  $http.get(clientSettings);
                        console.log("clientSettings ::",clientAppSetting);
                        return clientAppSetting;
                   }]
               }    
            });
        });
        
    }
});