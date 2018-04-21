define([
    'angular'

], function (angular) {
    'use strict';

    var controllers =  angular.module('app.orgControllers',[])
        .controller('organizationController', ['$rootScope','$scope','CanvasDataSet', organizationController])
        
    function organizationController($rootScope,$scope,CanvasDataSet) {
        
    	console.log(" CanvasDataSetCanvasDataSet ::",CanvasDataSet);
        var vm = this;
        vm.pageName = "Home/Organizations";
        vm.shapeType = 'circle';
     	var vis = require("vis");
         
        // create an array with nodes
        var nodes = new vis.DataSet([
            {id: 1, label: 'Verifications'},
            {id: 2, label: 'Medicaid'},
            {id: 3, label: 'Income'},
            {id: 4, label: 'X1 Rulesheet'},
            {id: 5, label: 'X2 Rulesheet'}
        ]);
        
        
        // create an array with edges
        var edges = new vis.DataSet([
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5}
        ]);
        
        
       // var container = document.getElementById('mynetwork'); //$('#mynetwork'); //change this to ngDirective
        
        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
          /*configure: {
            enabled: false,
              container: undefined,//container, //mynetwork1,
              showButton: true
          },*/ 
        nodes:{
            shape: vm.shapeType,
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
            enabled: true,
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
            arrowStrikethrough: true,
            chosen: true,
            color: {
              color:'#f40808',
              highlight:'#848484',
              hover: '#848484',
              inherit: 'from',
              opacity:1.0
            }
          },
          physics: true  
        }
        
        //var network = new vis.Network(container, data, options);
        $scope.data = data;
        $scope.options = options;

        console.log('organizationController loaded');
        
        /** GO Click Function **/
        vm.changeShape = function(){
            
            var nodes = new vis.DataSet([
                {id: 1, label: 'Malesh'},
                {id: 2, label: 'Dwaraka'},
                {id: 3, label: 'Subhraji'},
                {id: 4, label: 'X Rulesheet'},
                {id: 5, label: 'X1 Rulesheet'}
            ]);
            var edges = new vis.DataSet([
                {from: 1, to: 3},
                {from: 1, to: 2},
                {from: 2, to: 4},
                {from: 2, to: 5}
            ]);
            var data1 = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                nodes:{
                    shape: vm.shapeType,
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
                    enabled: true,
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
                arrowStrikethrough: true,
                chosen: true,
                color: {
                  color:'#f40808',
                  highlight:'#848484',
                  hover: '#848484',
                  inherit: 'from',
                  opacity:1.0
                }
              },
              physics: true  
            }
            
            $scope.data = data1;
            $scope.options = options;
            
        } //end of click function
         
        $scope.onSelect = function(items){
            alert("Select");
        };
        
        $scope.onClick = function(props){
            alert("Click");
        };
        
        $scope.onDoubleClick = function(props){
            alert("DoubleClick");
        };
        
        $scope.rightClick = function(props){
            alert("RightClick");
        };
      
        
        
        
    } //End of organizationController

    return controllers;

});
