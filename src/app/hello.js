angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: helloController
  });

function helloController($scope, $http) {
  var unObjet = {
    title: 'Je suis un titre',
    text: 'Ce texte pourrait être plus long. Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.',
    date: '2017-03-24',
    infos: "pas d'infos pour le moment"
  };
  $scope.tags = [];
  $http
    .get("data/taglist.json")
    .then(function (result) {
      $scope.tags = result.data;
    });
  $scope.limitExpand = 5;
  $scope.limit = $scope.limitExpand;
  $scope.news = [];
  for (var i = 0; i < 20; i++) {
    var newObject = angular.copy(unObjet);
    newObject.title += " " + i;
    $scope.news.push(newObject);
  }
}
