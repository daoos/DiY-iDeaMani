/*****  GLOBAL SERVICES *****/

define([
    'angular'
    
], function (angular){
    'use strict';
    
    return angular.module('app.global.services',[])
        .factory('GlobalService',['$rootScope','$http','CLIENT_APP_SETTINGS','CLIENT_SETTINGS', function ($rootScope, $http,CLIENT_APP_SETTINGS,CLIENT_SETTINGS) {
            
            
            console.log("Loading of GlobalService START");
            
            var global = {};
            
            global.getClientLogoUrl = function(){
                return getClientLogo();
            }
            
            global.getClientName = function(){
                return CLIENT_SETTINGS.client_name;
            }
            
            global.getSubTitle = function(){
                return CLIENT_SETTINGS.sub_title;
            }
            
            global.getDefaultAvatar = function(){
                var avatarUrl = "./app/config/DEMO/images/avatar.png";
                var clientAppSettings = CLIENT_SETTINGS;
                
                if(clientAppSettings.logo_base_path && clientAppSettings.client_id && clientAppSettings.avatar){
                    avatarUrl = clientAppSettings.logo_base_path + clientAppSettings.client_id + clientAppSettings.avatar;
                }

                return avatarUrl;
            }
            
            /** on need basis make it global for now its private **/
            function getClientBaseSettings (){
                console.log("Trying to build CLIENT SETTINGS::",CLIENT_APP_SETTINGS);
                
                //default settings
                var configPath  = "./app/config/";
                var clientAppSettings = "clientSettings.json";
                var clientId    = "DEMO";

                if(CLIENT_APP_SETTINGS.config_path){
                    configPath = CLIENT_APP_SETTINGS.config_path; 
                }

                if(CLIENT_APP_SETTINGS.config_path){
                    clientId = CLIENT_APP_SETTINGS.client_id;
                }
                if(CLIENT_APP_SETTINGS.client_app_settings){
                    clientAppSettings = CLIENT_APP_SETTINGS.client_app_settings;
                }

                console.log("Client App Settings Base Folder ::",configPath + clientId +"/"+clientAppSettings);
                return configPath + clientId +"/"+clientAppSettings;
            
            }
            
                                  
            function getClientLogo (){
                var clientLogoUrl = "./app/config/DEMO/images/demoLogo.jpg";
                var clientAppSettings = CLIENT_SETTINGS;

                if(clientAppSettings.logo_base_path && clientAppSettings.client_id && clientAppSettings.logo_image){
                    clientLogoUrl = clientAppSettings.logo_base_path + clientAppSettings.client_id + clientAppSettings.logo_image;
                }
                return clientLogoUrl;
            }
            
            
            return global;
            
        }]) /** End of GlobalService **/
    
        .factory('UserService',['$q','$rootScope','$http', function ($q,$rootScope, $http) { 
        
            var userSerice = {};
            var diyLeftNavMenuData = {};
            userSerice.folderNode = '';
            userSerice.leftNavTurnedOn = true;
            
            userSerice.toggleLeftNave = function(currState){
                if(currState){
                    userSerice.leftNavTurnedOn = false;
                }else{
                    userSerice.leftNavTurnedOn = true;
                }
                return userSerice.leftNavTurnedOn;
            }
            
            
            
            
            
            /** change the implementation of tihs function by passing logged in user id
                and get data from DB instead of DEMO Settings.json
            **/
            userSerice.getLeftNavigation = function(data){
                var leftNav = {};
                var promise = $http({
                    method: 'GET',
                    url: './app/config/DEMO/leftNavSettings.json',
                    data: data
                }).then(function(response){
                    userSerice.data = response.data.LEFT_NAV_SETTINGS;
                    return response.data.LEFT_NAV_SETTINGS;
                });
                
                return promise;
                
            }
            var data = {};
            userSerice.data = userSerice.getLeftNavigation(data);
            
            userSerice.deriveFolderState = function(_node){
                if(_node.collapsed){
                    return "fa fa-folder-close  folderColor";
                }else{
                    return "fa fa-folder-open  folderColor";
                }
            }
            userSerice.toggle = function(node){
                //console.log("toggle node.child::", node.child);
                if(node.child && node.child.length>0){
                    if(node.collapsed){
                    node.collapsed = false;
                    }else{
                        node.collapsed = true;
                    }
                }
                //console.log("toggle ::", node);
            }
            
            userSerice.toggleAll = function(_nodeTree){
                var _grandParent = userSerice.data[0];
                if(_grandParent.child && _grandParent.child.length>0){
                    if(_grandParent.expandAll){
                        _grandParent.expandAll = false;
                    }else{
                        _grandParent.expandAll = true;
                    }
                    for(i=0;i<_grandParent.child.length;i++){
                        var node = _grandParent.child[i];
                        if(node.type === 'folder'){
                            //console.log("folder node found ::",node);    
                            if(_grandParent.expandAll){
                                node.collapsed = true;
                            }else{
                                node.collapsed = false;
                            }
                            
                            if(node.child && node.child.length > 0){
                                console.log("child node has further childs found collapse/expand these as well later::",node);    
                            }
                        }
                    }
                }
            }
            

            
            userSerice.deriveClass = function(_nodeData){
                if(_nodeData.type==='folder'){
                    return 'nodeFolder';
                }else{
                    return 'nodeItem';
                }
            }
            
            return userSerice;
            
        }]);
            
            
});