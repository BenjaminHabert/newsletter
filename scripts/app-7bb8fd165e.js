function routesConfig(o,e,l){l.html5Mode(!0).hashPrefix("!"),e.otherwise("/"),o.state("app",{url:"/",component:"app"})}routesConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],angular.module("app",["ui.router"]),angular.module("app").component("app",{templateUrl:"app/hello.html",controller:function(){this.hello="Coucou le monde!"}}),angular.module("app").run(["$templateCache",function(o){o.put("app/hello.html","<h1>{{ $ctrl.hello }}</h1>\n")}]),angular.module("app").config(routesConfig);
//# sourceMappingURL=../maps/scripts/app-7bb8fd165e.js.map