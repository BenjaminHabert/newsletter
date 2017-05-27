angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: helloController
  });

function helloController($scope, $http) {
  $scope.tags = [];
  $http
    .get("data/taglist.json")
    .then(function (result) {
      $scope.tags = result.data;
    });
  $scope.limitExpand = 10;
  $scope.limit = $scope.limitExpand;
  var news = [];
  $http
    .get("data/news.json")
    .then(function (result) {
      news = result.data;
      $scope.selectedNews = performSeach('', news);
    });
  $scope.$watch('searchText', function (search) {
    $scope.selectedNews = performSeach(search, news);
  });
}

function performSeach(search, news) {
  var searchArray = [];
  if (search) {
    searchArray = search.split(',').map(function (s) {
      return s.trim().toLowerCase();
    });
  }
  for (var i = 0; i < news.length; i++) {
    news[i].relevance = computeRelevance(searchArray, news[i]);
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

function computeRelevance(searchArray, newsitem) {
  var tags = newsitem.tags || [];
  var relevance = 1;
  if (searchArray) {
    searchArray.forEach(function (searchWord) {
      var partialRelevance = 0;
      tags.forEach(function (item) {
        if (item.tag === searchWord) {
          partialRelevance += item.importance;
        }
      });
      relevance *= partialRelevance;
    });
  }
  return relevance.toFixed(2);
}
