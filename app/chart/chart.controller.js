'use strict';

angular
  .module('chartModule', [])
  .controller('chartController', function($scope, httpFactory) {
    $scope.result = httpFactory.manageData.valute;
    var objectFromRequest = {};
    for (var i = 0; i < $scope.result.length; i++) {
      var key = $scope.result[i].CharCode;
      objectFromRequest[key] = $scope.result[i].Value;
    }
    var dataArray = _.toPairs(objectFromRequest);
    // считаем данные для графика
    var labels = [];
    var data = [];

    var currentPage = Number(localStorage.getItem('currentPage'));
    var pagination = Number(localStorage.getItem('pagination'));
    var firtsNumberOfSlice = currentPage * pagination - pagination;
    var secondNumberOfSlice = currentPage * pagination;
    var iterationLimit;
    if (
      localStorage.getItem('currentPage') &&
      localStorage.getItem('pagination')
    ) {
      dataArray = dataArray.slice(firtsNumberOfSlice, secondNumberOfSlice);
      dataArray.sort(function(a, b) {
        return b[1] - a[1];
      });
      iterationLimit = dataArray.length;
      for (let i = 0; i < iterationLimit; i++) {
        labels.push(dataArray[i][0]);
        data.push(dataArray[i][1]);
      }
    } else {
      pagination = 9;
      dataArray = dataArray.slice(0, pagination);
      dataArray.sort(function(a, b) {
        return b[1] - a[1];
      });
      iterationLimit = dataArray.length;
      for (let i = 0; i < iterationLimit; i++) {
        labels.push(dataArray[i][0]);
        data.push(dataArray[i][1]);
      }
    }

    // создаем график 

    var ctx = document.getElementById('popChart').getContext('2d');
    var popChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Rubles',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data
          }
        ]
      },
      options: {
        offset: true,
        responisve: true,
        tooltips: { intersect: false }
      }
    });

    // меняем график при смене страницы 

    $scope.$on('myCustomEvent', function() {
      currentPage = Number(
        document.querySelector('#listNumber ul li.active a').innerHTML
      );
      pagination = Number(document.getElementById('pagination').value);
      firtsNumberOfSlice = currentPage * pagination - pagination;
      secondNumberOfSlice = currentPage * pagination;
      dataArray = _.toPairs(objectFromRequest);
      dataArray = dataArray.slice(firtsNumberOfSlice, secondNumberOfSlice);
      dataArray.sort(function(a, b) {
        return b[1] - a[1];
      });
      if (dataArray.length < pagination) {
        currentPage = Math.round(34 / pagination);
        firtsNumberOfSlice = currentPage * pagination - pagination;
        secondNumberOfSlice = currentPage * pagination;
        dataArray = _.toPairs(objectFromRequest);
        dataArray = dataArray.slice(firtsNumberOfSlice, secondNumberOfSlice);
        dataArray.sort(function(a, b) {
          return b[1] - a[1];
        });
      }
      var updateLabels = [];
      var updateData = [];
      iterationLimit = dataArray.length;
      for (let i = 0; i < iterationLimit; i++) {
        updateLabels.push(dataArray[i][0]);
        updateData.push(dataArray[i][1]);
      }
      popChart.data.labels = updateLabels;
      popChart.data.datasets[0].data = updateData;
      popChart.update();
      localStorage.setItem('currentPage', currentPage);
    });
  });
