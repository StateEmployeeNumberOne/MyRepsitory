"use strict";

angular
  .module("valuteList", [
    "angularUtils.directives.dirPagination",
    "ui.bootstrap"
  ])
  .controller("valute", function valuteList($scope, $http) {
    $http.get('https://www.cbr-xml-daily.ru/daily_json.js').then(function(response) {
      $scope.a = JSON.stringify(response.data.Valute)
      console.log(typeof $scope.a)
      $scope.b = JSON.parse($scope.a)
      console.log($scope.a)
      console.log($scope.b)
      $scope.valute_array = Object.values($scope.b);
      console.log(typeof $scope.b)
      console.log($scope.valute_array)
      
      $scope.result=$scope.valute_array;
      for (let k of $scope.result) {
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
    });

    $scope.options = [
      { id: 3, label: "3" },
      { id: 5, label: "5" },
      { id: 7, label: "7" },
      { id: 9, label: "9" }
    ];

    $scope.page = 1;
    $scope.currentPage = function() {
      localStorage.setItem("curPage", $scope.page);
    };
    if (localStorage.getItem("curPage")) {
      $scope.page = localStorage.getItem("curPage");
    }

    $scope.propertyName = "Value";

    $scope.sortButtonClick = function() {
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"))
        ? false
        : true;
      localStorage.setItem("sortOrder", $scope.reverse);
    };
    if (localStorage.getItem("sortOrder")) {
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"));
    }

    $scope.selectedName = 9;
    document.getElementById("pag").addEventListener("change", function() {
      localStorage.setItem("pag", document.getElementById("pag").value);
    });
    if (localStorage.getItem("pag")) {
      $scope.selectedName = localStorage.getItem("pag");
    }
  });

// parseInt(localStorage.getItem('pag').replace(/\D+/g,''));


// for (let k of $scope.valute_array) {
//   switch (k.Nominal) {
//     case 10:
//       k.Value = Number((k.Value / 10).toFixed(3));
//       k.Previous = (k.Previous / 10).toFixed(3);
//       break;
//     case 100:
//       k.Value = Number((k.Value / 100).toFixed(3));
//       k.Previous = (k.Previous / 100).toFixed(3);
//       break;
//     case 1000:
//       k.Value = Number((k.Value / 1000).toFixed(3));
//       k.Previous = (k.Previous / 1000).toFixed(3);
//       break;
//     case 10000:
//       k.Value = Number((k.Value / 10000).toFixed(3));
//       k.Previous = (k.Previous / 10000).toFixed(3);
//       break;
//     default:
//       k.Value = Number(k.Value.toFixed(3));
//       k.Previous = k.Previous.toFixed(3);
//       break;
//   }
// }