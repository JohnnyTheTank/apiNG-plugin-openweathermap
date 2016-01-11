"use strict";
apingApp.config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            //...
            openweathermap: [
                {'api_key':'<YOUR_OPENWEATHERMAP_API_KEY>'},
            ],
            //...
        }
    });
}]);