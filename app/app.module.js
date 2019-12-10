'use strict';

var currencyApp = angular.module('currencyApp', [

]);

currencyApp.controller('dateController' , function($scope){
  $scope.date = new Date();
});