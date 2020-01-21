"use strict";
angular
  .module('valuteList', [
    "angularUtils.directives.dirPagination",
  ])
  .controller("valute", function valuteList($scope, $http, httpFactory) {
    var time = moment(). format('YYYY/MM/DD')
    $http
      .get('https://www.cbr-xml-daily.ru/archive/2020/01/21/daily_json.js')
      .then(function(response) {
        $scope.valute_array = Object.values(response.data.Valute);
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

        $scope.get = function() {
          httpFactory.redditGet()
            .then(function (response) {
             $scope.result = Object.values(response.data.Valute);
             for (let k of $scope.result) {
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
            console.log($scope.result);
            }) 
        }
        
        $scope.get();

    // var supermassive = {}
    
    // for (var i = 0; i < $scope.valute_array.length; i++) {
    //   var key = $scope.valute_array[i].CharCode
    //   var massive = []
    //   supermassive[key] = $scope.valute_array[i].Value
    //   massive.push(supermassive)
    // }


// создаем график
    
    var labels_test = $scope.valute_array.map(function(e) {
      return e.CharCode;
   });
   var data_test = $scope.valute_array.map(function(e) {
      return e.Value;
   });
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
   $scope.updateg = function (){
    popChart.data.labels = labels_test.slice(Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))-Number(localStorage.getItem("pag"))),Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))));
    popChart.data.datasets[0].data = data_test.slice(Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))-Number(localStorage.getItem("pag"))),Number(localStorage.getItem("curPage")*Number(localStorage.getItem("pag"))));
    popChart.update();
      console.log(data,labels)
    }

  });

   //сохраняем номер страницы при перезагрузке
   $scope.page=1;
   $scope.currentPage = function() {
     localStorage.setItem("curPage", $scope.page);
     $scope.updateg();
   };
   if (localStorage.getItem("curPage")) {
     $scope.page = localStorage.getItem("curPage");
   } 


    // сохраняем порядок сортировки при перезагрузке
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
    $scope.options ={
    availableOptions: [
      {name: '7'},
      {name: '9'},
      { name: '12'}
    ],
    selectedOption: {id: '9', name: '9'} 
    };
    
    
    //сохраняем отображаемые элементы при перезагрузке
    
    document.getElementById("pag").addEventListener("change", function() {
      localStorage.setItem("pag", Number(document.getElementById("pag").value));
      $scope.updateg();
    });
    if (localStorage.getItem("pag")) {
      $scope.options.selectedOption.name = localStorage.getItem("pag");
    } 
  });
  