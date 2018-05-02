/**** ideaMani Canvas Drwaing Directives  ****/
require(['angular'],function(){
    
   angular.module('app.canvasDrawing',[])
    
    .factory('CanvasDataSet', function(){
        'user strict';
        return function (data,options){
            return new vis.DataSet(data,options);
        }
   })
    
    /** Log Image **/
   .directive('diyProcessDiagram', ['$compile','$injector','$document', function($compile, $injector,$document) {
       return { 
           restrict: 'EA',
           transclude: false,
           scope: {
               data: '=',
               options: '=',
               events: '=',
               callBackService: '='
           },
           link: function (scope, element, attr){
               
               console.log("options received::",scope.options);
               console.log("data received::",scope.data);
               
               scope.callBackService = attr.callBackService;
               var proxyService = $injector.get(scope.callBackService);
               
               
               //very bad way of injecting
               var vis = require("vis");
               var processDiagramEvents = [
                   'click',
                   'doubleclick',
                   'oncontext',
                   'hold',
                   'release',
                   'selectNode',
                   'selectEdge',
                   'deselectNode',
                   'deselectEdge',
                   'dragStart',
                   'dragging',
                   'dragEnd',
                   'hoverNode',
                   'blurNode',
                   'zoom',
                   'showPopup',
                   'hidePopup',
                   'startStabilizing',
                   'stabilizationProcess',
                   'stabilizationIterationsDone',
                   'stabilized',
                   'resize',
                   'initRedraw',
                   'beforeDrawing',
                   'afterDrawing',
                   'animationFinished'
               ];
               
               var processDiagram = null;
               scope.$watch('data', function(){
                   console.log("data changed");
                   if(scope.data === null){
                       return;
                   }
               })
               
               if(processDiagram !=null){
                   processDiagram.destroy();
               }
               
               processDiagram = new vis.Network(element[0], scope.data, scope.options);
               
               
               processDiagram.on('doubleClick', scope.onDoubleClick);
               processDiagram.on('hold', scope.onHoldClick);  
               processDiagram.on('release', scope.onReleaseClick);   
               processDiagram.on('click', scope.onClick);   
               
               
               
               scope.onDoubleClick = function() {
                    var doubleClickTime = new Date();
                    console.log("execute onDoubleClick function@",doubleClickTime);
                   var r = confirm("Do you want to edit  the node ?");
                   console.log("r ",r);
                   processDiagram.editNode();
               }
               scope.onHoldClick = function() {
                    var onHoldTime = new Date();
                    console.log("execute onHoldCliked function@",onHoldTime);
               }
               scope.onReleaseClick = function() {
                    var onReleaseTime = new Date();
                    console.log("execute onReleaseClick function@",onReleaseTime);
               }
               
               scope.onClick = function() {
                   console.log("execute onClick function@",processDiagram.getSelection());
                   var selectedEdges = processDiagram.getSelection().edges;
                   var selectedNodes = processDiagram.getSelection().nodes;
                   angular.forEach(selectedEdges, function(value, key) {
                      console.log('Edge key ' + key + ': '+ 'Edge Value ' + + value);
                    });
                   
                   angular.forEach(selectedNodes, function(value, key) {
                      console.log('Node key ' + key + ': '+ 'Node Value ' + + value);
                    });
                   
               }
               

                                 
               angular.forEach(scope.events, function (callback, event){
                   console.log("Event For Each");
                   if(processDiagramEvents.indexOf(String(event)) >=0){
                      processDiagram.on(event,callback); 
                   }
               });
               
               if(scope.events != null && scope.events.onload != null && angular.isFunction(scope.events.onload)){
                   console.log("Event Fired!!");
                   scope.events.onload(processDiagram);
               }

            
               scope.$watchCollection('options', function (options){
                   console.log("options changed ::",options);
                   if(processDiagram == null){
                       return;
                   }
                   processDiagram.setOptions(options);
               });
               
                scope.$watchCollection(function(){ return proxyService.visCanvasOptions}, function(processNodeOptions){
                        console.log("options changed ::",processNodeOptions);
                       if(processDiagram == null){
                           return;
                       }
                       processDiagram.setOptions(processNodeOptions);
                       processDiagram.addEdgeMode();
                       processDiagram.on('doubleClick', scope.onDoubleClick);
                       processDiagram.on('hold', scope.onHoldClick);  
                       processDiagram.on('release', scope.onReleaseClick);
                    processDiagram.on('click', scope.onClick);   
                });
               
                scope.$watchCollection(function(){ return proxyService.visCanvasData}, function(processNodesData){
                    if(processDiagram === null || !(processNodesData)){
                       return;
                   }
                   
                   processDiagram = new vis.Network(element[0], processNodesData, scope.options);
                   processDiagram.on('doubleClick', scope.onDoubleClick);
                   processDiagram.on('hold', scope.onHoldClick);    
                   processDiagram.on('release', scope.onReleaseClick);
                   processDiagram.on('click', scope.onClick);   
                    
                });
               
               scope.$watch(function(){ return proxyService.processNodes}, function(processNodes){
                    if(processNodes === null || !(processNodes)){
                       return;
                   }
                    console.log("processNodes ::",processNodes);
                   
                   console.log("$document[0] ::",$document[0]);
                   
                   /*processDiagram = new vis.Network(element[0], processNodesData, scope.options);
                   processDiagram.on('doubleClick', scope.onDoubleClick);
                   processDiagram.on('hold', scope.onHoldClick);    
                   processDiagram.on('release', scope.onReleaseClick);
                   processDiagram.on('click', scope.onClick);  */ 
                    
                });
               
               
               
               
           }
       };
   }]);
    
});