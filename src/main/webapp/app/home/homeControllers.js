define([
    'angular'

], function (angular) {
    'use strict';

    var controllers =  angular.module('app.homeControllers',[])
        .controller('homeController', ['$rootScope','$scope','HomeFactory', homeController])
        
    function homeController($rootScope,$scope,HomeFactory) {
        
        var mySelf = this;
        
        mySelf.nodesData = [];
        mySelf.edgesData = [];
        mySelf.nodesData.push({id: 1, "label": "Start", group: "edgenodes"});
        mySelf.graphOptions = {
            clickToUse: false,
            interaction: {
                dragNodes:true,
                dragView: true,
                hideEdgesOnDrag: false,
                hideNodesOnDrag: false,
                hover: true,
                hoverConnectedEdges: true,
                keyboard: {
                  enabled: true,
                  speed: {x: 10, y: 10, zoom: 0.02},
                  bindToWindow: true
                },
                multiselect: true,
                navigationButtons: true,
                selectable: true,
                selectConnectedEdges: true,
                tooltipDelay: 30,
                zoomView: true  
            },
            nodes:{
                borderWidth: 1,
                shadow: true,
            },
            groups: {
                'edgenodes': {
                    shape: 'dot',
                    color: '#5daf73' 
                },
                'processnodes': {
                    shape: 'box',
                    color: '#3f3fa8' 
                },
                'rulesnodes': {
                    shape: 'square',
                    color: '#914072' 
                },
                'rulesheetnodes': {
                    shape: 'square',
                    color: '#914072' 
                },
                'decisionnodes': {
                    shape: 'diamond',
                    color: '#9fbe1c' 
                },
                
            },
            manipulation: {
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
              physics: {stabilization: false}  
        }
        
        
        mySelf.diyCanvasItems = {};
        
        /** Retrieving Canbas Tab Pills **/
        var data = {};
        HomeFactory.getCanvasTabs(data).then(function (data){
            console.log("data @controller ::",data);
            if(data!==null){
                mySelf.diyCanvasItems = data;        
            }
        });

        var vis = require("vis");
        mySelf.processNodes =[{id: 1, "label": "GO", color: { background:"red", border:"blue",highlight:{background:"green",border:"black"}}}];
        mySelf.processEdges =[{}];
        mySelf.startNodeShape = 'dot';
        
        mySelf.visNodes = new vis.DataSet([{id: 7, label:'colorObject + highlight + hover', color: {background:'cyan', border:'blue',highlight:{background:'red',border:'blue'},hover:{background:'white',border:'red'}}}]);
        mySelf.visEdges = new vis.DataSet([{}]);
        
        
        mySelf.visData = {
            nodes: mySelf.visNodes,
            edges: mySelf.visEdges
        };
        
        mySelf.visOptions = {
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
                multiselect: true,
                navigationButtons: true,
                selectable: true,
                selectConnectedEdges: true,
                tooltipDelay: 30,
                zoomView: true  
            },
            nodes:{
                shape: mySelf.startNodeShape, //'dot',
                size: 20,
                font: {
                    size: 15
                },
                borderWidth: 1,
                shadow: true,
                shapeProperties: {
                  borderDashes: false, // only for borders
                  borderRadius: 6,     // only for box shape
                  interpolation: false,  // only for image and circularImage shapes
                  useImageSize: false,  // only for image and circularImage shapes
                  useBorderWithImage: false  // only for image shape
                },
            },
            manipulation: {
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
              physics: true  
        }
        
        
        mySelf.addStopProcess = function(){
            console.log("Adding stop process");
        }
        
        mySelf.addProcessStop = function(){
            console.log("Adding addProcessStop process");
        }
        
        mySelf.addProcessBox = function(){
            console.log("Adding addProcessBox process");
        }
        
        mySelf.addProcessRuleSheet = function(){
            console.log("Adding addProcessRuleSheet process");
        }
        
        mySelf.addProcessRulus = function(){
            console.log("Adding addProcessRulus process");
        }
        
        
        
        
        /**Retrieve based on user click on canvas pill canvas **/
        
    } //End of organizationController

    return controllers;

});
