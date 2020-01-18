"use strict";
angular
  .module("valuteList", [
    "angularUtils.directives.dirPagination",
    "ui.bootstrap"
  ])
  .controller("valute", function valuteList($scope, $http) {
    $http
      .get("https://www.cbr-xml-daily.ru/archive/2020/01/16/daily_json.js")
      .then(function(response) {
        $scope.valute_array = Object.values(response.data.Valute);
        $scope.current_time = response.data.Date
        for (let k of $scope.valute_array) {
          switch (k.Nominal) {
            // Math.round округляет до 3 знаков после
            // можно сделать через + и toFixed
            case 10:
              k.Value = Math.round((k.Value / 10) * 1000) / 1000;
              k.Previous = Math.round((k.Previous / 10) * 1000) / 1000;
              break;
            case 100:
              k.Value = Math.round((k.Value / 100) * 1000) / 1000;
              k.Previous = Math.round((k.Previous / 100) * 1000) / 1000;
              break;
            case 1000:
              k.Value = Math.round((k.Value / 1000) * 1000) / 1000;
              k.Previous = Math.round((k.Previous / 1000) * 1000) / 1000;
              break;
            case 10000:
              k.Value = Math.round((k.Value / 10000) * 1000) / 1000;
              k.Previous = Math.round((k.Previous / 10000) * 1000) / 1000;
              break;
            default:
              k.Value = Math.round((k.Value) * 1000) / 1000;
              k.Previous = Math.round((k.Previous) * 1000) / 1000;
              break;
          }
        }
      
     
    $scope.options = [
      { id: 3, label: "3" },
      { id: 5, label: "5" },
      { id: 7, label: "7" },
      { id: 9, label: "9" }
    ];
    
    $scope.date = Date.now()
    $scope.counter = 300000;

    // var updateCounter = function() {
    //   $scope.counter = $scope.counter - 1000;
    //   if ($scope.counter == 0) {
    //     $scope.counter = 300000;
    //   }
    // };
    // updateCounter();
    // $interval(updateCounter, 1000);

   
    $scope.page = 1;
    $scope.currentPage = function() {
      localStorage.setItem("curPage", $scope.page);
      $scope.$broadcast("SendDown", $scope.valute_array)
    };
    if (localStorage.getItem("curPage")) {
      $scope.page = localStorage.getItem("curPage");
    }


  });


    $scope.propertyName = "Value";

    $scope.sortButtonClick = function() {
      console.log(document.cookie)
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"))
        ? false
        : true;
      localStorage.setItem("sortOrder", $scope.reverse);
      $scope.$broadcast("SendDown", valuteList)
    };
    if (localStorage.getItem("sortOrder")) {
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"));
    }

    $scope.selectedName = 9;
    document.getElementById("pag").addEventListener("change", function() {
      localStorage.setItem("pag", document.getElementById("pag").value);
      $scope.$broadcast("SendDown", $scope.valute_array)
    });
    if (localStorage.getItem("pag")) {
      $scope.selectedName = localStorage.getItem("pag");
    };
    
  


  })
  