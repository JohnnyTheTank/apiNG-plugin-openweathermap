"use strict";

var jjtApingOpenWeatherMap = angular.module("jtt_aping_openweathermap", ['jtt_openweathermap'])
    .directive('apingOpenweathermap', ['apingOpenWeatherMapHelper', 'apingUtilityHelper', 'openweathermapFactory', function (apingOpenWeatherMapHelper, apingUtilityHelper, openweathermapFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingOpenweathermap, apingOpenWeatherMapHelper.getThisPlatformString(), appSettings);
                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if (typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        appid: apingUtilityHelper.getApiCredentials(apingOpenWeatherMapHelper.getThisPlatformString(), "api_key"),
                        lang: request.language || false,
                        units: request.units || "metric",
                    };

                    if (request.units == 'kelvin') {
                        requestObject.units = undefined;
                    }

                    if (request.cityName) {
                        requestObject.q = request.cityName;
                        if (request.countryCode) {
                            requestObject.q += "," + request.countryCode;
                        }
                        if (request.type) {
                            requestObject.type = request.type;
                        }

                        openweathermapFactory.getWeatherFromCitySearchByName(requestObject)
                            .then(function (_data) {
                                apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                            });
                    } else if (request.cityId) {
                        requestObject.id = request.cityId;
                        openweathermapFactory.getWeatherFromCityById(requestObject)
                            .then(function (_data) {
                                apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                            });
                    } else if (request.lat && request.lng) {
                        requestObject.lat = request.lat;
                        requestObject.lon = request.lng;
                        openweathermapFactory.getWeatherFromLocationByCoordinates(requestObject)
                            .then(function (_data) {
                                apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                            });
                    } else if (request.zip) {
                        requestObject.zip = request.zip;
                        if (request.countryCode) {
                            requestObject.zip += "," + request.countryCode;
                        }
                        openweathermapFactory.getWeatherFromLocationByZipcode(requestObject)
                            .then(function (_data) {
                                apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                            });
                    }
                });
            }
        }
    }]);