angular
  .module('app')
  .directive('newsItem', function () {
    return {
      restrict: 'E',
      scope: {
        itemData: '=data'
      },
      controller: ['$scope', '$sce', newsItemController],
      templateUrl: 'app/newsitem/newsitem.html'
    };
  }
);

function newsItemController($scope, $sce) {
  $scope.innerHTML = $sce.trustAsHtml($scope.itemData.rawhtml);
  $scope.imagelist = $scope.itemData.images;
}
