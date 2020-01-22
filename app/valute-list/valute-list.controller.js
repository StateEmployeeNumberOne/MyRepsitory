"use strict";
angular
  .module("valuteList", ["angularUtils.directives.dirPagination"])
  .controller("valute", function valuteList($scope, httpFactory) {
    var time = moment().format("YYYY/MM/DD");
    $scope.result;
    httpFactory.getRequestedData().then(function(response) {
      $scope.result = response.valute;
      $scope.lastUpdate = response.date;
    });

    //сохраняем номер страницы при перезагрузке
    $scope.page = 1;
    $scope.currentPage = function() {
      localStorage.setItem("curPage", $scope.page);
      $scope.update();
      console.log($scope.result, Date.now());
    };
    if (localStorage.getItem("curPage")) {
      $scope.page = localStorage.getItem("curPage");
    }

    // сохраняем порядок сортировки при перезагрузке
    $scope.propertyName = "Value";
    $scope.sortButtonClick = function() {
      console.log(document.cookie);
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"))
        ? false
        : true;
      localStorage.setItem("sortOrder", $scope.reverse);
      $scope.$broadcast("SendDown", valuteList);
    };
    if (localStorage.getItem("sortOrder")) {
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"));
    }

    $scope.options = {
      availableOptions: [{ name: "7" }, { name: "9" }, { name: "12" }],
      selectedOption: { id: "9", name: "9" }
    };

    //сохраняем отображаемые элементы при перезагрузке

    document.getElementById("pag").addEventListener("change", function() {
      localStorage.setItem("pag", Number(document.getElementById("pag").value));
      $scope.update();
    });
    if (localStorage.getItem("pag")) {
      $scope.options.selectedOption.name = localStorage.getItem("pag");
    }
  });
