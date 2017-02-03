require.config({
    baseUrl: 'scripts/lib',
    paths :{
        /*Libraries */
        'app' : '../app/app',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
        'jquery' : 'jquery/dist/jquery.min',	
		'LocalStorageModule' : 'angular-local-storage/dist/angular-local-storage.min',
        'ngTouch':'ngTouch/ngTouch',
        'nvd3ChartDirectives':'charts/angularjs-nvd3-directives.min',
        /*Controllers*/
        'navbarCtrl':'../app/controllers/navbarCtrl',
        'dashboardCtrl':'../app/controllers/dashboardCtrl',
        /*Services*/
        'Util':'../app/services/Util',
        'DataServices':'../app/services/DataServices',

    },
    shim: {
        
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular'],
            exports : 'angularRoute'
        },
		'LocalStorageModule' :{
            deps: ['angular'],
            exports : 'LocalStorageModule'
        },
		'ngTouch' :{
            deps: ['angular'],
            exports : 'ngTouch'
        },

       
    }
});


require(['require','angular','angularRoute','LocalStorageModule','ngTouch','app',], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['mainApp']);
    });
});