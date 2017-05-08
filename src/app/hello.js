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
    date: '2017-03-',
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
  var news = [];
  for (var i = 0; i < 20; i++) {
    var newObject = angular.copy(unObjet);
    newObject.title += " " + i;
    newObject.date += i;
    news.push(newObject);
  }
  $scope.selectedNews = performSeach('', news);
  $scope.$watch('searchText', function (search) {
    $scope.selectedNews = performSeach(search, news);
  });
}

function performSeach(search, news) {
  for (var i = 0; i < news.length; i++) {
    news[i].relevance = computeRelevance(search, news[i]);
  }
  // only news item with non 0 relevance
  var selected = news.filter(function (element) {
    return element.relevance > 0;
  });
  // sort by relevance and time
  selected = selected.sort(function (a, b) {
    var comp = b.relevance - a.relevance;
    if (comp === 0) {
      if (a.date > b.date) {
        comp = -1;
      } else if (a.date < b.date) {
        comp = 1;
      }
    }
    return comp;
  });
  return selected;
}

function computeRelevance(search, newsitem) {
  var tags = newsitem.tags | [];
  tags[0] = 0;
  var relevance = 0;
  if (search) {
    // compute
    relevance = 100 * Math.random().toPrecision(2);
  } else {
    relevance = 1;
  }
  return relevance;
}
