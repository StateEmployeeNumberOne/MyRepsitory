'use strict';

angular.module('chartPop',[]).controller('chart',
 function($scope){
  
    
    $scope.finished = function(){
    
      var labels_test = $scope.valute_array.map(function(e) {
        return e.CharCode;
     });
     var data_test = $scope.valute_array.map(function(e) {
        return e.Value;
     });

      let labels = labels_test.splice(0,$scope.selectedName)

      let data = data_test.splice(0,$scope.selectedName)
      var ctx = document.getElementById('popChart');
      var ctx = document.getElementById('popChart').getContext('2d');
      var ctx = $('popChart');
      var ctx = 'popChart';
    
    
       var popChart =  new Chart(ctx, {
         type: 'bar',
       data: {
         labels: labels,
         datasets: [{
             label: 'My Super Table',
             backgroundColor: 'rgb(255, 99, 132)',
             borderColor: 'rgb(255, 99, 132)',
             data: data,
         }]
     },
     options: {
       responisve: true
     }
     });
     $scope.$on("SendDown", function () {
      labels=null;
      data=null;
      console.log (labels,data)
      labels = labels_test.splice(($scope.page*$scope.selectedName),$scope.selectedName);
      data = data_test.splice(($scope.page*$scope.selectedName),$scope.selectedName);
      popChart.update();
      console.log (labels,data)
    });
    }
});


