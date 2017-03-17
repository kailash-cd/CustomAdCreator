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
        'angular-img-cropper':'cropImage/angular-img-cropper',
        'xeditable':'xeditable/xeditable',

        /*Controllers*/
        'navbarCtrl':'../app/controllers/navbarCtrl',
        'dashboardCtrl':'../app/controllers/dashboardCtrl',
        'canvasCtrl':'../app/controllers/canvasCtrl',
         'domResizeCtrl':'../app/controllers/domResizeCtrl',
        'csvCtrl':'../app/controllers/csvCtrl',
        'poiCsvCtrl':'../app/controllers/poiCsvCtrl',

        /*Services*/
        'Util':'../app/services/Util',
        'DataServices':'../app/services/DataServices',
        /*Directive*/
        'draggable':'../app/directives/draggable',
        'chalkfd':'../app/directives/chalkfd',
        'resizable':'../app/directives/resizable',
        'tookit':'../app/directives/tookit',
        'dynamic':'../app/directives/dynamic',



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
        'xeditable' :{
            deps: ['angular'],
            exports : 'xeditable'
        },


       
    }
});


require(['require','angular','angularRoute','LocalStorageModule','ngTouch','app','xeditable'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['mainApp']);
    });
});