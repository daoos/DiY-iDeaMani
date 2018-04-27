/**** Global Directives  ****/
require(['angular'],function(){
    
   var ngModule = angular.module('slimScroll',[]);
   ngModule.value("slimScrollConfig",{});
    
   angular.module('app.global.directives',[])
    
    /** Log Image **/
       .directive('logoImg', function(){
           return function($scope, $element, $attrs) {
               var imageUrl = $attrs.logoImg;
               $element.css({
                    'background-image': 'url('+imageUrl+')',
                    'background-size':   '100% 100%'
               });
           }
       })
    
     /** Workspace DIV **/
       .directive('diyWorkspace', ['$compile','$injector','$document', function($compile, $injector, $document) {
            return {
                restrict: 'EAC',
                scope: {
                    leftNavPageSrc: '=',
                     callBackService: '='
                },
                link: function ( scope, element, attrs ) {
                    
                    scope.isLeftNavTurnedOn = true;
                    var callBackService  = attrs.callBackService;
                    var proxyService = '';
                    if(callBackService){
                        proxyService = $injector.get(callBackService);
                    }
                    scope.$watch(function(){ return proxyService.leftNavTurnedOn}, function(val){
                                   
                        var children = element.children();
                        for(var i=0;i<children.length;i++){
                            var childNodes = children[i].childNodes;
                            for(var c=0;c<childNodes.length;c++){
                                var child = childNodes[c];
                                var childId = child.id;
                                var grandChilds = child.childNodes;
                                
                                
                                
                                if(childId==='leftNav'){
                                    if(val){
                                        child.style.marginLeft = "0px";
                                        
                                    }else{
                                        child.style.marginLeft = "-270px";
                                    }
                                }else if(childId==='main'){
                                    if(val){
                                        child.style.width = "calc(84vw)";
                                    }else{
                                        child.style.width = "calc(97vw)";
                                    }  
                                    for(var k=0;k<grandChilds.length;k++){
                                         var grandChild = grandChilds[k];
                                         var greatGrandChilds = grandChilds[k].childNodes;
                                         console.log("grandChild id",grandChild.id);
                                        
                                        for(var l=0;l<greatGrandChilds.length;l++){
                                            var greatGrandChild = greatGrandChilds[l];
                                            console.log("greatGrandChild id",greatGrandChild.id);
                                            if(greatGrandChild.id==='dynamicView'){
                                                if(val){
                                                    greatGrandChild.style.width = "calc(84vw)";
                                                    greatGrandChild.style.left = "calc(15vw)";
                                                }else{
                                                    greatGrandChild.style.width = "calc(98vw)";
                                                    greatGrandChild.style.left = "calc(1vw)";
                                                }   
                                            }
                                        }
                                    }
                                }
                            }
                            /*if(children[i].nodeType !== 8){
                                angular.element(children[i]).css('background', 'grey');
                            }*/
                        }
                        console.log("Val ::",val);
                        if(val){
                            scope.isLeftNavTurnedOn = val;
                        }else{
                            scope.isLeftNavTurnedOn = true;
                        }
                    });
                    
                    
                    var myTemplate = ''+
                         '<div class="workspace"><div class="leftPane" id="leftNav" data-ng-include="\''+attrs.leftNavPageSrc+'\'"><input type="hidden" ng-model="leftNavController.isLeftNavTurnedOn" value="'+scope.isLeftNavTurnedOn+'"></div>'+
                         '<div class="main-panel"  id="main" role="main">'+
                         '<div ui-view class="view-animate my-ease-in" > </div>'+
                         '</div></div>';
                    
                    
                    scope.deriveLeftPaneClass = function(leftNavState){
                        console.log("leftNavState ::",leftNavState);
                        if(leftNavState){
                            return "leftPane";
                        }else{
                            return "leftPaneHidden";
                        }
                    }
                    
                     element.html('').append( $compile(myTemplate)( scope ) );
                    
                    
                }
            };
        }])
    
     /** Animated DIV **/
       .directive('animatedFromRight', function(){
           return function(scope, element, attrs){
               element.css({
                    'position': 'absolute',
                    'left': 'calc(15vw)',
                    'height': 'calc(94vh)',
                    'width': '100%',
                    'transition': '1s ease',
                    'background-color': '#838685',
                    'border-left' : 'solid 2px #447948'
               });
               
            }
       })
    
         /* Main Left Nav Menu  */
       .directive('diyMenu', ['$compile','$injector', function($compile, $injector) {
            return {
                restrict: 'EAC',
                scope: {
                    callBackService: '='
                },
                template: '<div diy-menu-tree-ribbon="diyLeftNavMenuData" call-back-service="UserService"></div>' +
                          '<div diy-menu-tree="diyLeftNavMenuData" call-back-service="callBackService"></div>',
                link: function ( scope, element, attrs ) {
                    
                    scope.callBackService = attrs.callBackService;
                    var proxyService = $injector.get(scope.callBackService);
                    
                    scope.$watch(function(){ return proxyService.data}, function(val){
                        scope.diyLeftNavMenuData = val;
                    });
                }
            };
        }])
    
       /* Left Nav Menu Ribbon */
       .directive('diyMenuTreeRibbon', ['$compile','$injector', function($compile, $injector) {
            return {
                restrict: 'EAC',
                scope: {
                    diyMenuTreeRibbon: '=',
                    callBackService: '='
                },
                link: function ( scope, element, attrs ) {
                    
                    var callBackService  = attrs.callBackService;
                    var proxyService = '';
                    if(callBackService){
                        proxyService = $injector.get(callBackService);
                    }
                    
                    
                    var myTemplate = ''+
                        '<div class="navContainerRibbon"> <div class="navContainerRibbonActionIcons">'+
                        '<a href="#" ng-click="toggleAll(diyMenuTreeRibbon)"><i title="Collapse left-nav tree" ng-show="!diyMenuTreeRibbon[0].expandAll" class="fa fa-compress" style="color:greenyellow"></i>'+
                        '<i title="Expand left-nav tree" ng-show="diyMenuTreeRibbon[0].expandAll" class="fa fa-arrows-alt" style="color:#ae62b4"></i></a>'+
                        '<a href="#"><i title="Show priority links" class="fa fa-magnet" style="color:coral"></i></a>'+
                        '<a href="#"><i title="Share links" class="fa  fa-share-alt-square" style="color:yellow"></i></a>'+
                        '<a href="#"><i title="Show bookmarked links" class="fa fa-bookmark" style="color:greenyellow"></i></a></div>'+
                        '</div></div>';
                    
                        element.html('').append( $compile(myTemplate)( scope ) );
                    
                        scope.toggleAll = function(_nodeTree){
                            proxyService.toggleAll(_nodeTree);
                        }
                }
            };
        }])
    
    
        .directive("jqDiyScroll", [ '$window',  function ($window) {
            var userDefinedChoices = {};
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    
                    $(window).resize(function(){
                        var elem = element[0];
                        var divHeight = $window.innerHeight - elem.getBoundingClientRect().top;
                        var elemHeight = elem.getBoundingClientRect().height;
                        element.css('height',divHeight+'px')
                        element.parent().css('height',divHeight+'px')
                    });

                    function initialize(){
                        var elem = element[0];
                        var viewHeight = $window.innerHeight - elem.getBoundingClientRect().top;
                        var elemHeight = elem.getBoundingClientRect().height;
                        var opts = angular.extend({}, userDefinedChoices, scope.$eval(attrs.slimScroll));
                        angular.element(element).slimScroll(opts);
                    }

                    initialize();

                }
            };
        }])

    
        
       
    
       .directive( 'diyMenuTree', ['$compile', '$injector', function( $compile, $injector) {            
            return {
                restrict: 'EAC',
                scope:{
                    diyMenuTree: '=',
                    callBackService: '='
                },
                link:function ( scope, element, attrs) {
                    
                    var callBackService  = scope.callBackService;
                    var proxyService = '';
                    if(callBackService){
                        proxyService = $injector.get(scope.callBackService);
                    }
                    
                    
                    var myTemplate = ''+
                        '<ul><li data-ng-repeat="node in diyMenuTree">' +
                        '<div data-ng-class="deriveClass(node)" data-ng-click="toggle(node)"><span>{{deriveSpances(node)}}</span><span ng-if=node.type=="folder" ng-class="deriveFolderStateClass(node)">&nbsp;&nbsp;</span>'+
                        '<a ui-sref="organizations"> {{node.label}}</a></div>'+
                        '<span ng-if="!node.collapsed" class="deriveFolderStateClass(node)"><div diy-menu-tree="node.child" call-back-service="callBackService"></div></span>' +
                        '</li></ul>';
                    element.html('').append( $compile(myTemplate)( scope ) );
                    
                    scope.toggle = function(_nodeData){
                        proxyService.toggle(_nodeData);
                    }
                    
                    scope.deriveFolderStateClass = function(_nodeData){
                        //console.log("_collapse notworking:",_nodeData);
                        return "fa fa-folder-open  folderColor";
                        //return proxyService.deriveFolderState(_nodeData);
                    }
                    
                    scope.deriveNodeAnimClass = function(_nodeData){
                        /*if(_nodeData.collapsed){
                            if(_nodeData.type==='task'){
                                console.log("returning nodeItemFadeIn")
                                return 'nodeItemFadeIn';
                            } 
                        }else{
                            if(_nodeData.type==='task'){
                                console.log("returning nodeItemFadeIn")
                                return 'nodeItemFadeIn';
                            } 
                        }*/
                        
                    }
                    
                    scope.deriveClass = function(_nodeData){
                        
                        if(_nodeData.type==='folder'){
                            return 'nodeFolder';
                        }else if(_nodeData.type==='task'){
                            return 'nodeItem';
                        }else{
                            return 'ideaManiItem';
                        }                 
                    }
                    
                    scope.deriveSpances = function(_nodeData){
                        var nodeLevel = _nodeData.level;
                        var emptySpace = '\xa0';
                        if(_nodeData.type==='task'){
                            emptySpace = emptySpace+emptySpace;
                        }
                        for(i=0; i<=nodeLevel;i++){
                            emptySpace = emptySpace+emptySpace;
                        }
                        return emptySpace;
                    }
                    
                }
                
                
            };
        }])
        
    
});