define([
    'angular'

], function (angular) {
    'use strict';

    var services =  angular.module('app.homeServices',[])
    .factory("HomeFactory",['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
            
            var homeFactory = {};
            var endPoints = {
                canvasTabsEndpoint: './app/home/canvas-tab-pills.json'
            }
            homeFactory.data = [];
            var vis = require("vis");
            var processNodes =[{id: 1, "label": 'Start', shape: 'dot' }];
            var processEdges =[{}];
            var id = 1;
            var startNodeShape = 'box';
        
             homeFactory.visCanvasOptions = {
                    clickToUse: false,
                    interaction: {
                        dragNodes:true,
                        dragView: true,
                        hideEdgesOnDrag: false,
                        hideNodesOnDrag: false,
                        hover: true,
                        hoverConnectedEdges: true,
                        keyboard: {
                          enabled: false,
                          speed: {x: 10, y: 10, zoom: 0.02},
                          bindToWindow: true
                        },
                        multiselect: false,
                        navigationButtons: true,
                        selectable: true,
                        selectConnectedEdges: true,
                        tooltipDelay: 300,
                        zoomView: true  
                    },
                    nodes:{
                        shape: startNodeShape, //'dot',
                        shapeProperties: {
                          borderDashes: false, // only for borders
                          borderRadius: 6,     // only for box shape
                          interpolation: false,  // only for image and circularImage shapes
                          useImageSize: false,  // only for image and circularImage shapes
                          useBorderWithImage: false  // only for image shape
                        },
                        size: 25
                    },
                    manipulation: {
                        editNode: function (data, callback) {
                              // filling in the popup DOM elements
                              console.log('edit', data);
                          },
                        enabled: false,
                        initiallyActive: true,
                        addNode: true,
                        addEdge: true,
                        editEdge: true,
                        deleteNode: true,
                        deleteEdge: true,
                        controlNodeStyle:{
                          // all node options are valid.
                        }
                      },  
                    edges:{
                        arrows: {
                          to:     {enabled: true, scaleFactor:1, type:'arrow'},
                          middle: {enabled: false, scaleFactor:1, type:'arrow'},
                          from:   {enabled: false, scaleFactor:1, type:'arrow'}
                        },
                        arrowStrikethrough: false,
                        chosen: true,
                        color: {
                          color:'#1d1c1c',
                          highlight:'#848484',
                          hover: '#848484',
                          inherit: 'from',
                          opacity:1.0
                        }
                      },
                      physics: false  
                }
            
            var visNodes = new vis.DataSet(processNodes);
            var visEdges = new vis.DataSet([{}]);

            homeFactory.visCanvasData = {
                nodes: visNodes,
                edges: visEdges
            };
        
        
        
            homeFactory.getHomeContent = function(data){
            	return null;;
            };
            
            homeFactory.getCanvasTabs = function(data){
                var promise = $http({
                   method: 'GET',
                    url: endPoints.canvasTabsEndpoint,
                    data: data
                }).then(function (response){
                    if(response.status===200){
                        return response.data;
                    }else{
                        return null;
                    }
                });
                return promise;
            };
            
            homeFactory.addProcessBox = function(){
                console.log("added Process Box");
                id++;
                var nodeProcessBoxItem = { id: id, label: 'New Process', shape: 'diamond' };
                processNodes.push(nodeProcessBoxItem);
                console.log("processNodes ::",processNodes);
                var newVisNodes = new vis.DataSet(processNodes);
                 homeFactory.visCanvasOptions = {
                    clickToUse: false,
                    interaction: {
                        dragNodes:true,
                        dragView: true,
                        hideEdgesOnDrag: false,
                        hideNodesOnDrag: false,
                        hover: true,
                        hoverConnectedEdges: true,
                        keyboard: {
                          enabled: false,
                          speed: {x: 10, y: 10, zoom: 0.02},
                          bindToWindow: true
                        },
                        multiselect: false,
                        navigationButtons: true,
                        selectable: true,
                        selectConnectedEdges: true,
                        tooltipDelay: 300,
                        zoomView: true  
                    },
                    manipulation: {
                        editNode: function (data, callback) {
                              // filling in the popup DOM elements
                              console.log('edit', data);
                          },
                        enabled: false,
                        initiallyActive: true,
                        addNode: true,
                        addEdge: true,
                        editEdge: true,
                        deleteNode: true,
                        deleteEdge: true,
                        controlNodeStyle:{
                          // all node options are valid.
                        }
                      },  
                    edges:{
                        arrows: {
                          to:     {enabled: true, scaleFactor:1, type:'arrow'},
                          middle: {enabled: false, scaleFactor:1, type:'arrow'},
                          from:   {enabled: false, scaleFactor:1, type:'arrow'}
                        },
                        arrowStrikethrough: false,
                        chosen: true,
                        color: {
                          color:'#1d1c1c',
                          highlight:'#848484',
                          hover: '#848484',
                          inherit: 'from',
                          opacity:1.0
                        }
                      },
                      physics: false  
                }
               
                homeFactory.visCanvasData = {
                    nodes: newVisNodes,
                    edges: visEdges
                };
                
            };
        
            homeFactory.addProcessStop = function(){
                console.log("added process addProcessStop");
            }

            homeFactory.addProcessRulesSheet = function(){
                console.log("added Process addProcessRulesSheet");
                 console.log("added Process Box");
                id++;
                var nodeProcessBoxItem = { id: id, label: 'New Rules Sheet' };
                processNodes.push(nodeProcessBoxItem);
                console.log("processNodes ::",processNodes);
                var newVisNodes = new vis.DataSet(processNodes);
               
                homeFactory.visCanvasData = {
                    nodes: newVisNodes,
                    edges: visEdges
                };
            }

            homeFactory.addProcessRule = function(){
                console.log("added Process addProcessRule");
            }

            homeFactory.addProcessConnector = function(){
                console.log("added Process addProcessConnector");
                homeFactory.visCanvasOptions = {
                    clickToUse: false,
                    interaction: {
                        dragNodes:true,
                        dragView: true,
                        hideEdgesOnDrag: false,
                        hideNodesOnDrag: false,
                        hover: true,
                        hoverConnectedEdges: true,
                        keyboard: {
                          enabled: false,
                          speed: {x: 10, y: 10, zoom: 0.02},
                          bindToWindow: true
                        },
                        multiselect: false,
                        navigationButtons: true,
                        selectable: true,
                        selectConnectedEdges: true,
                        tooltipDelay: 300,
                        zoomView: true  
                    },
                    nodes:{
                        shape: startNodeShape, //'dot',
                        shapeProperties: {
                          borderDashes: false, // only for borders
                          borderRadius: 6,     // only for box shape
                          interpolation: false,  // only for image and circularImage shapes
                          useImageSize: false,  // only for image and circularImage shapes
                          useBorderWithImage: false  // only for image shape
                        },
                        size: 25
                    },
                    manipulation: {
                          editNode: function (data, callback) {
                              // filling in the popup DOM elements
                              console.log('edit', data);
                          },
                         addEdge: function (data, callback) {
                              console.log('add edge', data);
                              if (data.from == data.to) {
                                  var r = confirm("Do you want to connect the node to itself?");
                                  if (r === true) {
                                      callback(data);
                                  }
                              }
                              else {
                                  callback(data);
                              }
                         },
                        enabled: false,
                        initiallyActive: true,
                        addNode: true,
                        addEdge: true,
                        editEdge: true,
                        deleteNode: true,
                        deleteEdge: true,
                        controlNodeStyle:{
                          // all node options are valid.
                        }
                      },  
                    edges:{
                        arrows: {
                          to:     {enabled: true, scaleFactor:1, type:'arrow'},
                          middle: {enabled: false, scaleFactor:1, type:'arrow'},
                          from:   {enabled: false, scaleFactor:1, type:'arrow'}
                        },
                        arrowStrikethrough: false,
                        chosen: true,
                        color: {
                          color:'#1d1c1c',
                          highlight:'#848484',
                          hover: '#848484',
                          inherit: 'from',
                          opacity:1.0
                        }
                      },
                      physics: false  
                }
            }

            homeFactory.addProcessDecisionBox = function(){
                console.log("added Process addProcessDecisionBox");
            }

        
            
            return homeFactory;
        }])

    return services;


});