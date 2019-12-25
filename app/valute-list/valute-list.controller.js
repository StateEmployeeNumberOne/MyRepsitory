'use strict'


angular.module('valuteList',['angularUtils.directives.dirPagination','ui.bootstrap']).controller('valute', 
function valuteList($scope, $http) {
  $http({method: 'GET', url: 'https://www.cbr-xml-daily.ru/daily_json.js'}).
  then(function success(response) {
    $scope.daily_json=response;
    $scope.valute_array = Object.values($scope.daily_json.data.Valute);
    for (let k of $scope.valute_array) {
      switch (k.Nominal){
        case 10: 
          k.Value=(k.Value/10).toFixed(3);
          k.Previous=(k.Previous/10).toFixed(3);
          break;
        case 100: 
          k.Value=(k.Value/100).toFixed(3);
          k.Previous=(k.Previous/100).toFixed(3)
          break;
        case 1000: 
          k.Value=(k.Value/1000).toFixed(3);
          k.Previous=(k.Previous/1000).toFixed(3)
          break;
        case 10000: 
          k.Value=(k.Value/10000).toFixed(3);
          k.Previous=(k.Previous/10000).toFixed(3)
          break;
        default:
          k.Value=k.Value.toFixed(3);
          k.Previous=k.Previous.toFixed(3)
          break;
      }
    }
    $scope.result = $scope.valute_array;
    $scope.order = $scope.result;
    console.log($scope.result)
  });
     
  $scope.options = [
    {id:3, label: "3"},
    {id:5, label: "5"},
    {id:7, label: "7"},
    {id:9, label: "9"},
      ];
      
  $scope.page=1;
  $scope.currentPage=function() {
    localStorage.setItem('curPage', $scope.page)
  };
  if(localStorage.getItem('curPage')) {
    $scope.page=localStorage.getItem('curPage')
  };
  
  
  $scope.propertyName = 'Value';


  $scope.sortButtonClick =function(){
    $scope.reverse = JSON.parse(localStorage.getItem('sortOrder')) ? false : true 
    localStorage.setItem('sortOrder',$scope.reverse)
  };
  if(localStorage.getItem('sortOrder')){
    $scope.reverse = JSON.parse(localStorage.getItem('sortOrder'));
  }
  
 





  
  $scope.selectedName=9;
  document.getElementById('pag').addEventListener ('change', function () {
    localStorage.setItem('pag', (document.getElementById('pag').value))
  });
  if (localStorage.getItem('pag')) {
    $scope.selectedName = localStorage.getItem('pag')
  };

  });





  // parseInt(localStorage.getItem('pag').replace(/\D+/g,''));
 
 
