/************************************************************/
/************************************************************/
/**********************APP SETTINGS***************************/
/************************************************************/
/************************************************************/


define(['angular'], function(angular){
    
    var app_settings_module = angular.module('appSettings',[]);
    var app_settings = {
        'APP_CLIENT_SETTINGS': {
            'client_id': 'DEMO',
            'config_path': 'app/config/',
            'config_file': 'appSettings.json'
        }
    }
    
    /** Returns CLIENT ID**/
    app_settings_module.getClientId = function(){
        return app_settings.APP_CLIENT_SETTINGS.client_id;
    }
    
    /** Returns CONFIG PATH**/
    app_settings_module.getConfigPath = function(){
        return app_settings.APP_CLIENT_SETTINGS.config_path;
    }
    
    /** Returns CONFIG FILE NAME**/
    app_settings_module.getConfigName = function(){
        return app_settings.APP_CLIENT_SETTINGS.config_file;
    }

    /** Returns CONFIG FILE WITH FULL NAME**/
    app_settings_module.getClientSettingsConfiguration = function(){
        return app_settings.APP_CLIENT_SETTINGS;
    }
    
    
    return app_settings_module;

    
});
    

