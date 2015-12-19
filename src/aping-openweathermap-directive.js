"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-openweathermap
 @licence MIT
 */

var jjtApingOpenWeatherMap = angular.module("jtt_aping_openweathermap", ['jtt_openweathermap'])
    .directive('apingOpenweathermap', ['apingOpenWeatherMapHelper', 'apingUtilityHelper', 'openweathermapFactory', function (apingOpenWeatherMapHelper, apingUtilityHelper, openweathermapFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingOpenweathermap, apingOpenWeatherMapHelper.getThisPlattformString(), appSettings);
                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        appid: apingUtilityHelper.getApiCredentials(apingOpenWeatherMapHelper.getThisPlattformString(), "appid"),
                        lang: request.language || false,
                        units: request.units || "metric",
                    };

                    if(request.cityName) {
                        requestObject.q = request.cityName;
                        if(request.countryCode) {
                            requestObject.q += ","+request.countryCode;
                        }
                        if(request.type) {
                            requestObject.type = request.type;
                        }

                        openweathermapFactory.getWeatherFromCitySearchByName(requestObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.cityId) {
                        requestObject.id = request.cityId;
                        openweathermapFactory.getWeatherFromCityById(requestObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.lat && request.lng) {
                        requestObject.lat = request.lat;
                        requestObject.lon = request.lng;
                        openweathermapFactory.getWeatherFromLocationByCoordinates(requestObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.zip) {
                        requestObject.zip = request.zip;
                        if(request.countryCode) {
                            requestObject.zip += ","+request.countryCode;
                        }
                        openweathermapFactory.getWeatherFromLocationByZipcode(requestObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    }
                });
            }
        }
    }]);