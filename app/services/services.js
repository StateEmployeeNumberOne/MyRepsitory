angular.module("httpModule", []).factory(
  "httpFactory",
  function($http) {
    function getRequestedData() {
      var a, b;
      return $http
        .get("https://www.cbr-xml-daily.ru/archive/2020/01/21/daily_json.js")
        .then(function(response) {
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
          return { valute: a, date: b };
        });
    }

    return {
      getRequestedData: getRequestedData
    };
  }
); 



  
