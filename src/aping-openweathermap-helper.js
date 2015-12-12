"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-openweathermap
 @licence MIT
 */

jjtApingOpenWeatherMap.service('apingOpenWeatherMapHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "openweathermap";
    };

    this.getThisPlattformLink = function () {
        return "https://openweathermap.org/";
    };

    this.getObjectByJsonData = function (_data, _model) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            if (_data.constructor === Array) {
                //replace '_data.items'
                if (_data.items) {

                    //replace '_data.items'
                    angular.forEach(_data.items, function (value, key) {
                        var tempResult = _this.getItemByJsonData(value, _model);
                        if(tempResult) {
                            requestResults.push(tempResult);
                        }
                    });
                }
            } else {
                var tempResult = _this.getItemByJsonData(_data, _model);
                if(tempResult) {
                    requestResults.push(tempResult);
                }
            }
        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "weather":
                    returnObject = this.getWeatherItemByJsonData(_item);
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getRainInfoFromObject = function (_rain) {

        var returnObject = {
            duration:false,
            volume:false,
        };

        if(typeof _rain === "object") {
            angular.forEach(_rain, function (value, key) {
                returnObject.duration = key;
                returnObject.volume = value;
            });
        }

        return returnObject;
    };

    this.getWeatherInfoFromArray = function (_weatherArray) {

        var returnObject = {
            code: false,
            caption: false,
            text : false,
            icon_name: false,
            icon_url: false,
        };

        if (_weatherArray.constructor === Array) {
            returnObject.code = _weatherArray[0].id || false;
            returnObject.caption = _weatherArray[0].main || false;
            returnObject.text = _weatherArray[0].description || false;
            returnObject.icon_name = _weatherArray[0].icon || false;
            returnObject.icon_url = _weatherArray[0].icon ? "https://openweathermap.org/img/w/"+_weatherArray[0].icon+".png" : false;
        }

        return returnObject;
    };

    this.getWeatherItemByJsonData = function (_item) {
        var weatherObject = apingModels.getNew("weather", this.getThisPlattformString());

        //fill _item in socialObject
        $.extend(true, weatherObject, {
            //weather_code: false,
            //weather_caption: false, //rain
            //weather_text : false, //light rain
            //weather_icon_name: false,
            //weather_icon_url: false,

            temp: _item.main ? _item.main.temp : false,
            pressure: _item.main ? _item.main.pressure : false,
            humidity: _item.main ? _item.main.humidity : false,
            temp_min: _item.main ? _item.main.temp_min : false,
            temp_max: _item.main ? _item.main.temp_max : false,
            sea_level: _item.main ? _item.main.sea_level : false,
            grnd_level: _item.main ? _item.main.grnd_level : false,
            wind_speed: _item.wind ? _item.wind.speed : false,
            wind_deg: _item.wind ? _item.wind.deg : false,
            //rain_duration: false,
            //rain_volume: false,
            clouds: _item.clouds ? _item.clouds.all : false,

            timestamp: Date.now(),
            date_time: new Date(),

            sunrise_timestamp : _item.sys ? _item.sys.sunrise : false,
            sunrise_date_time : _item.sys ? new Date( _item.sys.sunrise ) : false,
            sunset_timestamp : _item.sys ? _item.sys.sunset : false,
            sunset_date_time : _item.sys ? new Date( _item.sys.sunset ) : false,

            loc_city : _item.name || false,
            loc_city_id: _item.id || false,
            loc_country : _item.sys ? _item.sys.country : false,
            loc_lat : _item.coord ? _item.coord.lat : false,
            loc_lng : _item.coord ? _item.coord.lon : false,
            //loc_zip : false,
        });

        if(_item.rain) {
            var tempRainObject = this.getRainInfoFromObject(_item.rain);
            weatherObject.rain_duration = tempRainObject.duration || false;
            weatherObject.rain_volume = tempRainObject.volume || false;
        }

        if(_item.weather) {
            var tempWeatherObject = this.getWeatherInfoFromArray(_item.weather);
            weatherObject.weather_code = tempWeatherObject.code || false;
            weatherObject.weather_caption = tempWeatherObject.caption || false;
            weatherObject.weather_text = tempWeatherObject.text || false;
            weatherObject.weather_icon_name = tempWeatherObject.icon_name || false;
            weatherObject.weather_icon_url = tempWeatherObject.icon_url || false;
        }


        return weatherObject;
    };
}]);