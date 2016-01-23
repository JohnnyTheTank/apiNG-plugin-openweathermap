"use strict";
angular.module('jtt_aping').config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            openweathermap: [
                {'api_key':'<YOUR_OPENWEATHERMAP_API_KEY>'},
            ],
            //...
        }
    });
}]);