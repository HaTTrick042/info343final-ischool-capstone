"use strict";

var capstonesUrl = 'https://api.parse.com/1/classes/capstones';


angular.module('CapstonesList', [])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'LPLyK3Gy2gc4VHUW143qhkZXSblTUC1jzRdwC7AY';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'Tyu8ovkDEuLhi6TvX8gBRbJQazvXJSRRFigEu9gl';
    })
    .controller('CapstonesController', function($scope, $http) {
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
                    // $scope.refreshCapstones();

                })
                .finally(function() {
                    $scope.inserting = false;
                });
        };

        $scope.submitForm = function(isValid) {
            // check to make sure the form is completely valid
            $scope.submitted = true;
            if (isValid) {
                $scope.addCapstones();
                alert('Your entry has been received!');
                $scope.submitted = false;
            }
        };

        $scope.cancel = function($location) {
            if (window.confirm("Do you really want to leave?")) {
                window.location = 'index.html';
            }
        };

        $scope.year="";
        $scope.program="";
        $scope.category = "";
        
        $scope.refreshCapstones();


        $scope.filter = function() {
          
            // $http.get(capstonesUrl + '?where={"year":year.value}')
            //     .success(function(data) {
            //         $scope.capstones = data.results;
            //     });
            $http.get(capstonesUrl)
                .success(function(data) {
                
                    $scope.capstones = data.results.filter(function(capstone) {
                        console.log(data.results);

                        if ($scope.year == "yearAll" || $scope.year == "") {
                            capstone.year = year.value;
                        }

                        if ($scope.category == "categoryAll" || $scope.category == "") {
                            capstone.category = category.value;
                        }

                        if ($scope.program == "sortedAll" || $scope.program == "") {
                            capstone.program = program.value;
                        }

                        return (capstone.year == year.value && capstone.category == category.value 
                            && capstone.program == program.value);
                    });

                });

        };


        $scope.incrementLikes = function(capstone, amount) {
            $scope.updating = true;
            $http.put(capstonesUrl + '/' + capstone.objectId, {
                likes: {
                    __op: 'Increment',
                    amount: amount
                }
            })
            .success(function(responseData) {
                capstone.likes = responseData.likes;
            }).error(function(err) {
                console.log(err);
                })
            .finally(function() {
                $scope.updating = false;
            });

        };

    })

    .controller('ProjectController', function($scope, $http) {
        $scope.getCapstone = function() {

            var newUrl = window.location.pathname+window.location.search;
            var urlArray = newUrl.split('=');
            var objectId = urlArray[1];

            $http.get(capstonesUrl)
                .success(function(data) {
                    $scope.capstones = data.results.filter(function(project) {
                        console.log("are you getting here");
                        return (project.objectId == objectId);
                    });
                });
            // $http.get(capstonesUrl + '/' + objectId)
            //     // console.log(capstonesUrl + '/' + objectId)
            //     .success(function(data) {

            //         $scope.capstones = data.results;
            //         console.log($scope.capstones);


            //     });
        };
        $scope.getCapstone();

        $scope.changePic = function(imgSrc) {
            document.getElementById("img-main").src = imgSrc;
        };

    });

