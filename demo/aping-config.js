"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        'openweathermap': [{'appid':'<YOUR_OWM_APP_ID>'}],
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_openweathermap.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        model: "weather",
        getNativeData: false, // Use "true" for getting native data from plugins
    });

}]);