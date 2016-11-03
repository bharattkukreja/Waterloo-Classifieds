(function() {

	'use strict';

	angular
		.module('waterlooClassifieds', ['ngMaterial', 'ui.router', 'firebase'])
		.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

			$mdThemingProvider.theme('default')
				.primaryPalette('teal')
				.accentPalette('orange');

			$urlRouterProvider.otherwise('/classifieds');

			$stateProvider
				.state('classifieds', {
					url: '/classifieds',
					templateUrl: 'components/classifieds/classifieds.tpl.html',
					controller: 'classifiedsCtrl as vm'
				})

				.state('classifieds.new', {
					url: '/new',
					templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
					controller: 'newClassifiedsCtrl as vm'
				})

				.state('classifieds.edit', {
					url: '/edit/:id',
					templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
					controller: 'editClassifiedsCtrl as vm',
					params: {
						classified: null
					}
				});

		});
})()
