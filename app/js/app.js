var pymeapp = angular.module('pymeapp', ['ui.router']);

pymeapp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider.state('dashboard', {
        templateUrl: "templates/dashboard.html",
        controller: 'dashboardCtrl'
    });
    $stateProvider.state('dashboard.report',{
    	url: "/dashboard",
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