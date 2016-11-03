(function() {

	'use strict';

	angular
		.module('waterlooClassifieds')
		.factory('classifiedsFactory', function($http, $firebaseArray) {

			var ref = new Firebase('https://waterlooclassifieds-f783e.firebaseio.com/');

			return {
				ref: $firebaseArray(ref)
			}

			/*
			function getClassifieds() {
				return $http.get('data/classifieds.json');
			}*/

		});

})();
