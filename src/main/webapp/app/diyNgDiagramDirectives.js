/**** ideaMani Canvas Drwaing Directives  ****/
require(['angular'],function(){
    
   angular.module('app.canvasDrawing',[])
    
    .factory('CanvasDataSet', function(){
        'user strict';
        return function (data,options){
            return new vis.DataSet(data,options);
        }
   })
    
   .directive('ideaManiProcessDiagram', ['$compile','$injector','$document', function($compile, $injector,$document) {
        document.oncontextmenu = function(e) {
          if(e.target.hasAttribute('right-click')){
              return false;
          }  
        };
        return {
           restrict: 'EA',
           transclude: false,
           scope: {
               nodesData: '=',
               edgesData: '=',
               graphOptions: '=',
               callBackService: '='
            },
            link: function (scope, element, attr){
                
                var nodesData               = scope.nodesData;
                var edgesData               = scope.edgesData;
                var diagramDataUndo         = [];
                var graphOptions            = scope.graphOptions;
                var networkContainerWidth   = element[0].offsetHeight;
                var networkContainerHeight  = element[0].offsetWidth;
                var contextPopupMenu        = undefined;
                var ctxPopupOpen            = false;
                var mouseHoldTime           = 0;
                var mouseReleaseTime        = 0;
                var WHEN_MULTIPLE_NODES_SELECTED    = 1;
                var WHEN_SINGLE_NODE_SELECTED       = 2;
                var WHEN_NO_NODES_SELECTED          = 3;
                var WHEN_HOLD_ON_MULTIPLE_NODES     = 4;
                var WHEN_HOLD_ON_SINGLE_NODE        = 4;
                var nodeId                          = 2;
                var endNodeAdded                    = false;
                var clearedCanvas                   = false;
                
                
                
                /** injecting call back service **/
                scope.callBackService    = attr.callBackService;
                var proxyService         = $injector.get(scope.callBackService);
                
                /** badway of injecting vis**/
                var vis                  = require("vis");
                
                var diagramData = {
                    nodes: nodesData,
                    edges: edgesData
                };
                
                var processDiagram = new vis.Network(element[0], diagramData, graphOptions);
                positionDigram();
                
                function positionDigram() {
                    var nodeXYCoordinates = processDiagram.getPositions();
                    //position logic needs to be written
                    var newX = networkContainerWidth / 4;
                    var newY = networkContainerHeight / 4;
                    //for now manually position it
                    processDiagram.moveNode(1,-700,-400);
                }
                
                processDiagram.on('click', function(params){ 
                    console.log("params ::",params);
                    destroyContextMenu();
                });
                
                processDiagram.on('hold', function(params){ 
                    mouseHoldTime = params.event.timeStamp;
                    destroyContextMenu();
                });
                
                processDiagram.on('release', function(params){ 
                    mouseReleaseTime = params.event.timeStamp;
                    var xPos = params.pointer.DOM.x;
                    var yPos = params.pointer.DOM.y;
                    var totalHoldTime = mouseReleaseTime - mouseHoldTime;
                    console.log("totalHoldTime ::",totalHoldTime);
                    destroyContextMenu();
                    if(totalHoldTime > 500 ) {
                        var selectedNodes = getSelectedNodes();
                        console.log("selectedNodes ::",selectedNodes);
                        if(selectedNodes.length > 0){
                            if(selectedNodes.length > 1){
                                generateContextMenu(WHEN_HOLD_ON_MULTIPLE_NODES,xPos,yPos);
                            }else{
                                generateContextMenu(WHEN_HOLD_ON_SINGLE_NODE,xPos,yPos);
                            }  
                        }
                    }
                });
                
                scope.clearCanvas = function(){
                    console.log("Clearing Canvas....");
                    clearedCanvas = true;
                    destroyContextMenu();
                    diagramDataUndo = diagramData;
                    nodesData = [];
                    edgesData = [];
                    nodesData.push({id: 1, "label": "Start", group: "edgenodes"});
                    diagramData = {
                        nodes: nodesData,
                        edges: edgesData
                    }
                    processDiagram.setData(diagramData);
                    nodeId = 2;
                    endNodeAdded = false;
                }
                
                scope.undoClearCanvas = function(){
                    console.log("Undoing Clear Canvas....");
                    clearedCanvas = false;
                    destroyContextMenu();
                    diagramData = diagramDataUndo;
                    nodesData = diagramData.nodes;
                    edgesData = diagramData.edges;
                    processDiagram.setData(diagramData);
                    //not known yet
                    nodeId = getNodesCount();
                    nodeId++;
                    console.log("undoClearCanvas::nodeId ::",nodeId);
                    endNodeAdded = isEndNodeAdded();
                    console.log("endNodeAdded ::",endNodeAdded);
                    
                }
                
                scope.addDecisionNode = function(){
                    console.log("adding new addDecisionNode from context menu...");
                    if(!endNodeAdded){
                        nodesData.push({id:nodeId, label:"Decision", group: "decisionnodes" });
                        edgesData.push({from:nodeId-1, to: nodeId}); //auto connect
                        diagramData.nodes   = nodesData;
                        diagramData.edges   = edgesData;
                        processDiagram.setData(diagramData);
                        nodeId++;
                        destroyContextMenu();
                    }
                    
                }
                
                scope.addRuleSheetNode = function(){
                    console.log("adding new addRuleSheetNode from context menu...");
                    if(!endNodeAdded){
                        nodesData.push({id:nodeId, label:"Rulesheet", group: "rulesheetnodes" });
                        edgesData.push({from:nodeId-1, to: nodeId}); //auto connect
                        diagramData.nodes   = nodesData;
                        diagramData.edges   = edgesData;
                        processDiagram.setData(diagramData);
                        nodeId++;
                        destroyContextMenu();
                    }
                    
                }
               
                scope.addProcessNode = function(){
                    console.log("adding new process node from context menu...");
                    if(!endNodeAdded){
                        nodesData.push({id:nodeId, label:"Process", group: "processnodes", widthConstraint: { minimum: 120 }, heightConstraint: { minimum: 35, valign: 'middle' }  });
                        edgesData.push({from:nodeId-1, to: nodeId}); //auto connect

                        diagramData.nodes   = nodesData;
                        diagramData.edges   = edgesData;
                        processDiagram.setData(diagramData);
                        nodeId++;

                        destroyContextMenu();
                    }
                }
                
                scope.addEndNode = function(){
                    console.log("adding End Node from context menu...");
                    
                    if(!endNodeAdded){
                        //push({id: 1, "label": "Start", group: "edgenodes"});
                        nodesData.push({id:nodeId, label:"End", group: "endnodes"});
                        edgesData.push({from:nodeId-1, to: nodeId}); //auto connect

                        diagramData.nodes   = nodesData;
                        diagramData.edges   = edgesData;
                        processDiagram.setData(diagramData);
                        nodeId++;
                        endNodeAdded = true;
                        destroyContextMenu();    
                    }
                    
                }
                
            
                function destroyContextMenu(){
                     console.log("destroyContextMenu fired");
                     var ctxPopupMenuElem = angular.element($document[0].querySelector('.popupContextMenu'));
                     ctxPopupMenuElem.remove();
                     ctxPopupOpen = false;
                     console.log("destroyContextMenu removed");

                }
                
                function getSelectedNodes(){
                     var selectedNodes = processDiagram.getSelection().nodes;
                     console.log(selectedNodes.length);
                     return selectedNodes;
                }
                
                /** nodes length**/
                function getNodesCount(){
                    return diagramData.nodes.length;
                }
                
                /** is end node added?**/
                function isEndNodeAdded(){
                    var isEndNodeFound = false;
                    angular.forEach(diagramData.nodes, function(value, key) {
                        console.log('Node key ' + key);
                        console.log('Node key ' + value.group);
                        if(value.group === 'endnodes'){
                            isEndNodeFound = true;
                        }
                        //later write the logic based on selected node type also based on multiple selection
                    }); 
                    
                    
                    return isEndNodeFound;
                }
                
                element.bind('contextmenu',function(e){
                    console.log("User Right is hijaked ....e :",e)
                    var pageX = e.pageX;
                    var pageY = e.pageY;
                    var offsetX = e.offsetX;
                    var offsetY = e.offsetY;
                    var contextMenuLeft  = (pageX - offsetX);
                    var contextMenuTop  = (pageY - offsetY);
                    if(ctxPopupOpen){
                        destroyContextMenu();    
                    }
                    var selectedNodes = getSelectedNodes(); //processDiagram.getSelection().nodes;
                    //there are/is selected Nodes
                    var noOfSelectedNodes = selectedNodes.length;
                    if(noOfSelectedNodes >0){
                        if(noOfSelectedNodes >1){
                            angular.forEach(selectedNodes, function(value, key) {
                                console.log('Node key ' + key + ': '+ 'Node Value ' + + value);
                                //later write the logic based on selected node type also based on multiple selection
                            }); 
                            generateContextMenu(WHEN_MULTIPLE_NODES_SELECTED,contextMenuLeft,contextMenuTop);    
                        }else{
                            generateContextMenu(WHEN_SINGLE_NODE_SELECTED,contextMenuLeft,contextMenuTop);    
                        }
                    }else{
                        generateContextMenu(WHEN_NO_NODES_SELECTED,contextMenuLeft,contextMenuTop);
                    }
                        
                    
                    e.preventDefault();
                }); /** end of right click **/
                
                function generateContextMenu(context, xPos, yPos){
                    
                    
                    var undoOption = '';
                    if(clearedCanvas){
                       undoOption = '<li>-&nbsp;&nbsp;<a ng-click="undoClearCanvas()">Undo Clear</a></li>';
                    }else{
                        undoOption = '<li>-&nbsp;&nbsp;<a ng-click="clearCanvas()">Clear Canvas</a></li>';    
                    }
                    //
                    var newElement = $compile('<div class="popupContextMenu" style="left:'+xPos+'px; top:'+yPos+'px; "><div class="popupHeader">DiYRules-Context Menu</div><div class="ctxContent"><ul class="dashed-list"><li>+&nbsp;&nbsp;<a ng-click="addProcessNode()">Add Process</a></li><li>+&nbsp;&nbsp;<a ng-click="addRuleSheetNode()">Add Rulesheet</a></li><li>+&nbsp;&nbsp;<a ng-click="addDecisionNode()">Add Decision Node</a></li><li>+&nbsp;&nbsp;Add Connector</li><li>+&nbsp;&nbsp;<a ng-click="addEndNode()">Add End Node</a></li>'+undoOption+                          
                    '<li>-&nbsp;&nbsp;Delete Selected</li></ul></div></div>')(scope);
                    element.append(newElement);
                    ctxPopupOpen = true;  
                }
                
            }    
        };
   
   }])
    
    
    /** diyProcessDiagram **/
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
               
               scope.callBackService    = attr.callBackService;
               var proxyService         = $injector.get(scope.callBackService);
               //very bad way of injecting
               var vis                  = require("vis");
               var nodesData            = scope.data.nodes;
               var nodes                = new vis.DataSet(nodesData);
               console.log("nodesData :::::::::::::::::::::::::::::::",nodesData);
               console.log("nodes    ::::::::::::::::::::::::::::::::",nodes);
               
               
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
               processDiagram.on('click', function(params){
                   scope.onClick(params);
               });   
               
               
               
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
               
               scope.onClick = function(params) {
                   console.log("params ::", params);
                   var nodeId = params['nodes']['0'];
                   if(nodeId){
                       console.log("clicked nodeId  ::",nodeId); 
                       console.log("nodesData getAll()::",nodes.getIds());
                       var clickedNode =  nodes.get(1);
                       clickedNode = {id: 100, label: 'Mallesh'};
                       clickedNode.color = {
                           background: '#000000'
                       }
                       scope.data.nodes.update(clickedNode);
                       
                       console.log("clickedNode ::", clickedNode);
                       
                   }
                   
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
                       processDiagram.on('click', function(params){
                           console.log("scope.onClick ::",params);
                           scope.onClick(params);
                       }); 
                });
               
                scope.$watchCollection(function(){ return proxyService.visCanvasData}, function(processNodesData){
                    if(processDiagram === null || !(processNodesData)){
                       return;
                   }
                   
                   processDiagram = new vis.Network(element[0], processNodesData, scope.options);
                   processDiagram.on('doubleClick', scope.onDoubleClick);
                   processDiagram.on('hold', scope.onHoldClick);    
                   processDiagram.on('release', scope.onReleaseClick);
                   processDiagram.on('click', function(params){
                       console.log("scope.onClick ::",params);
                       scope.onClick(params);
                    });  
                    
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