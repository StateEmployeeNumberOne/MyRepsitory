angular.module("httpModule", []).factory("httpFactory", 
  function($http) {
    var a,b;
    time = moment().format("YYYY/MM/DD");
    function manageData(response){
    b = response.data.Date;
    a = Object.values(response.data.Valute);
      for (let k of a) {
        switch (k.Nominal) {
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
            k.Value = Math.round(k.Value * 1000) / 1000;
            k.Previous = Math.round(k.Previous * 1000) / 1000;
            break;
        }
      }  
    }
      function getRequestedData() {
        return $http
          .get("https://www.cbr-xml-daily.ru/archive/" + time + "/daily_json.js")
          .then(function(response) {
            manageData(response)
            return { valute: a, date: b }
            }).catch(
              function getRequestedData(){
                time = moment().format("YYYY/MM/DD");
                console.log("нет данных на" + " " + time);
                time = moment().subtract(1, "days").format("YYYY/MM/DD");
                return $http
               .get("https://www.cbr-xml-daily.ru/archive/" + time + "/daily_json.js")
               .then(function(response) {
                manageData(response)
                return { valute: a, date: b }}) 
              }).catch(
                function getRequestedData(){
                  time = moment().subtract(1, "days").format("YYYY/MM/DD");
                  console.log("нет данных на" + " " + time);
                  time = moment().subtract(2, "days").format("YYYY/MM/DD");
                  return $http
                 .get("https://www.cbr-xml-daily.ru/archive/" + time + "/daily_json.js")
                 .then(function(response) {
                  manageData(response)
                  return { valute: a, date: b }}) 
                })
          }
  return { getRequestedData: getRequestedData };
});
