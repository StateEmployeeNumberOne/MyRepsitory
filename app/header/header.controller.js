'use strict';

angular.module('headerModule',[]).controller('header',
 function($scope, $interval){
  var tick = function(){
    $scope.date = Date.now();
  }
  tick();
  $interval(tick,1000);
});


