angular.module('tatami')
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                resolve: {
                    user: ['ProfileService', function(ProfileService) {
                        return ProfileService.get().$promise;
                    }]
                }
            });
    });
