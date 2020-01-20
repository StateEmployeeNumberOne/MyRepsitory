angular.module('services',[]).factory('service',
 function(){ 
   
 
   var test
  return{
    function ($http) { 
      $http
      .get('https://www.cbr-xml-daily.ru/archive/2020/01/21/daily_json.js')
      .then(function(response) {
        test = Object.values(response.data.Valute)
        console.log(test)
      })}
  
  }

  
});