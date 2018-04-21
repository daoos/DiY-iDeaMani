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
   .directive('diyProcessDiagram', function(){
       return { 
           restrict: 'EA',
           transclude: false,
           scope: {
               data: '=',
               options: '=',
               events: '='
           },
           link: function (scope, element, attr){
               
               console.log("options received::",scope.options);
               
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
                   if(scope.data ==null){
                       return;
                   }
               })
               
               if(processDiagram !=null){
                   processDiagram.destroy();
               }
               console.log("vis ::",vis);
               
               processDiagram = new vis.Network(element[0], scope.data, scope.options);
               
               angular.forEach(scope.events, function (callback, event){
                   if(processDiagramEvents.indexOf(String(event)) >=0){
                      processDiagram.on(event,callback); 
                   }
               });
               
               if(scope.events != null && scope.events.onload != null && angular.isFunction(scope.events.onload)){
                   scope.events.onload(processDiagram);
               }
               
               scope.$watchCollection('options', function (options){
                   console.log("options changed ::",options);
                   if(processDiagram == null){
                       return;
                   }
                   processDiagram.setOptions(options);
               });
               
           }
       };
   });
    
});