angular
  .module('app')
  .directive('newsItem', function () {
    return {
      restrict: 'E',
      scope: {
        itemData: '=data'
      },
      templateUrl: 'app/newsitem/newsitem.html'
    };
  }
);
