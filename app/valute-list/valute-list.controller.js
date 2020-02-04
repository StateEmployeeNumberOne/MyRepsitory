"use strict";
angular
  .module("valuteModule", ["angularUtils.directives.dirPagination"])
  .controller("valuteController", function valuteList($scope, httpFactory) {
    $scope.result = httpFactory.manageData.valute;
    $scope.lastUpdate = httpFactory.manageData.date;

    //сохраняем номер страницы при перезагрузке
    
    $scope.page = 1;
    $scope.currentPage = function() {
      localStorage.setItem("currentPage", $scope.page);
      $scope.$broadcast("myCustomEvent", $scope.page);
    };
    if (localStorage.getItem("currentPage")) {
      $scope.page = localStorage.getItem("currentPage");
    }

    // сохраняем порядок сортировки при перезагрузке

    $scope.propertyName = "Value";
    $scope.sortButton = function() {
      console.log(document.cookie);
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"))
        ? false
        : true;
      localStorage.setItem("sortOrder", $scope.reverse);
    };
    if (localStorage.getItem("sortOrder")) {
      $scope.reverse = JSON.parse(localStorage.getItem("sortOrder"));
    }

    $scope.options = {
      availableOptions: [{ name: "7" }, { name: "9" }, { name: "12" }],
      selectedOption: { id: "9", name: "9" }
    };

    //сохраняем отображаемые элементы при перезагрузке

    document
      .getElementById("pagination")
      .addEventListener("change", function() {
        localStorage.setItem(
          "pagination",
          Number(document.getElementById("pagination").value)
        );
        $scope.$broadcast("myCustomEvent");
      });
    if (localStorage.getItem("pagination")) {
      $scope.options.selectedOption.name = localStorage.getItem("pagination");
    }
  });
