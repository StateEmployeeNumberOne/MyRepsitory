'use strict';

angular.module('chartPop',[]).controller('chart',
 function($scope){
  
    
    $scope.finished = function(){
    
     
     $scope.$on("SendDown", function () {
       
      popChart.data.labels = labels_test.splice(7,15);
      popChart.data.datasets[0].data = data_test.splice(7,15);
      popChart.update();
    });

    






  }})
