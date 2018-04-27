if (typeof define !== 'function') {
    
    var define = require('amdefine')(module);
}

define({
    
 paths: {
     'lodash'               : 'node_modules/lodash/lodash.min',
     'domReady'             : 'node_modules/requirejs-domready/domReady',
     'angular'              : 'node_modules/angular/angular.min',
     'ui.router'            : 'node_modules/@uirouter/angularjs/release/angular-ui-router.min',
     'jquery'               : 'node_modules/jquery/dist/jquery.min',
     'deferredBootstrapper' : 'node_modules/angular-deferred-bootstrap/angular-deferred-bootstrap.min',
     'jquery.slimscroll'    : 'node_modules/jquery-slimscroll/jquery.slimscroll.min',
     'bootstrap'            : 'node_modules/bootstrap/dist/js/bootstrap.min',
     'ngAnimate'            : 'node_modules/angular-animate/angular-animate.min',
     'ui.bootstrap.tpls'    : 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls',
     'd3'                   : 'node_modules/d3/dist/d3.min',
     'jquery.slimscroll'    : 'node_modules/jquery-slimscroll/jquery.slimscroll.min',
     'c3'                   : 'node_modules/d3/dist/c3.min',
     'less'                 : 'node_modules/less/dist/less.min',
     'app-settings'         : 'app/config/appConfig',
     'popper'               : 'node_modules/popper.js/dist/popper',
     'vis'                  : 'node_modules/vis/dist/vis'
 },
 
 shim: {
     
     'angular': {
         'deps'                     : ['jquery'],
         'exports'                  : 'angular'
     },
     'deferredBootstrapper'         : ['angular'],
     'ui.router'                    : ['angular'],
     'jquery-slimscroll'            : ['jquery'],
     'bootstrap'                    : ['jquery'],
     'ngAnimate'                    : ['angular'],
     'vis'                          : {
         exports: 'vis'
     },
     'ui.bootstrap.tpls'            : ['angular'],
     'd3'                           : {
         exports: 'd3'
     },
     'c3'                           : {
         deps:['d3'],
         exports:'c3'
     }
 }    
    
});
