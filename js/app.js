
"use strict";

var capstonesUrl = 'https://api.parse.com/1/classes/capstones';

angular.module('CapstonesList', [])
    .config(function($httpProvider) {

        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'LPLyK3Gy2gc4VHUW143qhkZXSblTUC1jzRdwC7AY';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'Tyu8ovkDEuLhi6TvX8gBRbJQazvXJSRRFigEu9gl';

    })

    .controller('CapstonesController', function($scope, $http) {
        //refreshes the list of comments by getting feed from parse.com
        $scope.refreshCapstones = function() {
            $http.get(capstonesUrl)
                .success(function(data) {

                    $scope.capstones = data.results;

                });
            
        };

        $scope.refreshCapstones();

        $scope.addCapstones = function() {
            $scope.inserting = true;
            $http.post(capstonesUrl, $scope.newCapstone)
                .success(function(responseData) {
                    $scope.newCapstone.objectId = responseData.objectId;
                    $scope.capstones.push($scope.newCapstone);
                    // $scope.newCapstone = {remove: false};
                    // $scope.successfulFeed = true;
                    $scope.refreshCapstones();

                })
                .finally(function() {
                    $scope.inserting = false;
                });
        };
    });

var app = angular.module('myApp', []);

function projectsController($scope, $http) {

    $scope.projects = [];

    $scope.loadProjects = function() {
        var httpRequest = $http({
            method: 'POST',
            url: '/echo/json/',
            data: mockDataForThisTest

        }).success(function(data, status) {
            $scope.projects = data;
        });

    };

}