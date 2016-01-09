"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        openweathermap: [
            {'api_key':'<YOUR_OPENWEATHERMAP_API_KEY>'},
        ],
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_blanko.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        model: "weather",
        getNativeData: false, // Use "true" for getting native data from plugins
    });

}]);