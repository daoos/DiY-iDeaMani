define(['angular'], function(angular){
   
    var diy_ng_app_config_module = angular.module('diyapp.constants',[]);
    var diy_ng_app_config_data   = {
        'DIY_APP_GLOBAL_CONFIG': {
            'app_title'     :       'DiYDecisions',
            'app_version'   :       '0.1',
            'debug_mode'    :       'true',
        }
    } 
    
    angular.forEach(diy_ng_app_config_data, function(k,v) {
        diy_ng_app_config_module.constant(v,k);
    })

    return diy_ng_app_config_module;
});