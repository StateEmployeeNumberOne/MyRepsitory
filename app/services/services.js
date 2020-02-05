angular.module("httpModule", []).factory("httpFactory", function() {
  function manageData() {
    var time = moment().format("YYYY/MM/DD")
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.cbr-xml-daily.ru/archive/" + time + "/daily_json.js", false);
    xhr.send();
    var mas = JSON.parse(xhr.response);
    var b = mas.Date;
    var a = Object.values(mas.Valute);
    // приводим значения к номиналу в 1 рубль
    for (let k of a) {
      switch (k.Nominal) {
        case 10:
          k.Value = Number((k.Value / 10).toFixed(3));
          k.Previous = Number((k.Previous / 10).toFixed(3));
          break;
        case 100:
          k.Value = Number((k.Value / 100).toFixed(3));
          k.Previous = Number((k.Previous / 100).toFixed(3));
          break;
        case 1000:
          k.Value = Number((k.Value / 1000).toFixed(3));
          k.Previous = Number((k.Previous / 1000).toFixed(3));
          break;
        case 10000:
          k.Value = Number((k.Value / 10000).toFixed(3));
          k.Previous = Number((k.Previous / 10000).toFixed(3));
          break;
        default:
          k.Value = Number(k.Value.toFixed(3));
          k.Previous = Number(k.Previous.toFixed(3));
          break;
      }
    }
    return { valute: a, date: b };
  }
  return { manageData: manageData() };
});
