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

                    var openweathermapSearchObject = {
                        appid: apingUtilityHelper.getApiCredentials(apingOpenWeatherMapHelper.getThisPlattformString(), "appid"),
                        lang: request.lang || false,
                        units: request.units || "metric",
                    };

                    if(request.cityName) {

                        openweathermapSearchObject.q = request.cityName;
                        if(request.countryCode) {
                            openweathermapSearchObject.q += ","+request.countryCode;
                        }
                        if(request.type) {
                            openweathermapSearchObject.type = request.type;
                        }

                        openweathermapFactory.getWeatherFromCitySearchByName(openweathermapSearchObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.cityId) {
                        openweathermapSearchObject.id = request.cityId;
                        openweathermapFactory.getWeatherFromCityById(openweathermapSearchObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.lat && request.lng) {
                        openweathermapSearchObject.lat = request.lat;
                        openweathermapSearchObject.lon = request.lng;
                        openweathermapFactory.getWeatherFromLocationByCoordinates(openweathermapSearchObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.zip) {
                        openweathermapSearchObject.zip = request.zip;
                        if(request.countryCode) {
                            openweathermapSearchObject.zip += ","+request.countryCode;
                        }
                        openweathermapFactory.getWeatherFromLocationByZipcode(openweathermapSearchObject).success(function(_data){
                            apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    }



                    //get _data for each request
                        // on success:
                            // apingController.concatToResults(apingOpenWeatherMapHelper.getObjectByJsonData(_data, appSettings.model));
                });
            }
        }
    }]);