angular.module('app', ['ui.router'])
  .config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
      url: '/',
      views: {
        '': {
          templateUrl: './templates/main.html'
        },
        'nav@home': {
          templateUrl: './templates/assets/nav.html'
        },
        'body@home': {
          templateUrl: './templates/body.html'
        },
        'footer@home': {
          templateUrl: './templates/assets/footer.html'
        }
      }
    });
  }]);
