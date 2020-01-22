'use strict';

angular.module('chartModule',[]).controller('chartController',
 function($scope,httpFactory){
  $scope.result;
  httpFactory.getRequestedData()
 .then(function (response) {
   console.log(response)
   $scope.result = response.valute; 
   




   var supermassive = {}
    
    for (var i = 0; i < $scope.result.length; i++) {
      var key = $scope.result[i].CharCode
      supermassive[key] = $scope.result[i].Value
    }
    for (key in supermassive){
      console.log(key + '+' + supermassive[key])
    }

    // setTimeout (function(){console.log(supermassive)},1000)
    console.log(supermassive)

    // создаем график

   var labels_test = $scope.result.map(function(e) {
      return e.CharCode;
   });
   var data_test = $scope.result.map(function(e) {
      return e.Value;
   });
   console.log(labels_test,data_test)
   var labels
   var data
   if (localStorage.getItem("curPage") && localStorage.getItem("pag")){
    labels = labels_test.slice(Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))-Number(localStorage.getItem("pag"))),Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))));
    
    data = data_test.slice(Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))-Number(localStorage.getItem("pag"))),Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))));
    
  } else {
    labels = labels_test.splice(0,$scope.displayedItems)
    data = data_test.splice(0,$scope.displayedItems)
    }
    var ctx = document.getElementById('popChart').getContext('2d');

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
     offset:true,
     responisve: true
   }
   });

   $scope.update = function (){
    popChart.data.labels = labels_test.slice(Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))-Number(localStorage.getItem("pag"))),Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))));
    popChart.data.datasets[0].data = data_test.slice(Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))-Number(localStorage.getItem("pag"))),Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))));
    popChart.update();
      console.log(data,labels)
    }
  
  })
  })
