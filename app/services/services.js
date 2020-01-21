angular.module('httpService',[]).factory('httpFactory',
 function($http){ 
  function redditGet () {
    return $http.get('https://www.cbr-xml-daily.ru/archive/2020/01/21/daily_json.js')
  }
  return {
    redditGet: redditGet
  }
 
  
}); 

      

  
