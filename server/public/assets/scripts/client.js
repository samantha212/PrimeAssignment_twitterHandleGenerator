/**
 * Created by samanthamusselman on 1/12/16.
 */

var app = angular.module('handleApp', []);

var nounList = [];
var adjectiveList = [];

app.controller('myController', function($scope, $http){
    getNouns();

    function getNouns(){
        $http({
            method: 'GET',
            url: '/nouns'
        }).then(function(response){
            var holderNounList = response.data.nouns;
            nounList = shuffleArray(holderNounList);
            getAdjectives();
        })
    };

    function getAdjectives(){
        $http({
            method: 'GET',
            url: '/adjectives'
        }).then(function(response){
            var holderAdjList = response.data.adjectives;
            adjectiveList = shuffleArray(holderAdjList);
            createHandles();
        })
    };

    function createHandles(){
        var list = [];
        var links = [];
        for(var i = 0; i<nounList.length; i++){
            var twitterLink = "http://www.twitter.com/" + adjectiveList[i] + nounList[i];
            var handle = {"adjective": adjectiveList[i], "noun": nounList[i], "link": twitterLink};

            list.push(handle);
            links.push(twitterLink);
        }
        $scope.handles = list;

    };

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

});

