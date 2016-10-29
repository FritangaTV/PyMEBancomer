var pymeapp = angular.module('pymeapp', ['ui.router']);

//comentario
pymeapp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "templates/dashboard.html",
        controller: 'dashboardCtrl'
    });
    $stateProvider.state('dashboard.report',{
	    views: {
	      'today': {
	        templateUrl: "templates/dashboard/today.html",
	        controller: 'todayCtrl'
	      },
	      'prediction': {
	        templateUrl: "templates/dashboard/prediction.html",
	        controller: 'predictionCtrl',
	      },
	      'tips': {
	        templateUrl: "templates/dashboard/tips.html",
	        controller: 'tipsCtrl'
	      }
	    }
  	});
});