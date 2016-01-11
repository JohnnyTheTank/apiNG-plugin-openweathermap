"use strict";

jjtApingOpenWeatherMap.service('apingOpenWeatherMapHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlatformString = function () {
        return "openweathermap";
    };

    this.getThisPlatformLink = function () {
        return "https://openweathermap.org/";
    };

    this.getObjectByJsonData = function (_data, _helperObject) {
        var requestResults = [];

        if (_data && _data.data) {
            var _this = this;

            if (_data.data.constructor === Array) {
                if (_data.data.items) {

                    angular.forEach(_data.data.items, function (value, key) {
                        var tempResult;
                        if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = value;
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject.model);
                        }
                        if(tempResult) {
                            requestResults.push(tempResult);
                        }
                    });
                }
            } else {

                var tempResult;
                if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                    tempResult = _data.data;
                } else {
                    tempResult = _this.getItemByJsonData(_data.data, _helperObject.model);
                }
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
            duration:undefined,
            volume:undefined,
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
            code: undefined,
            caption: undefined,
            text : undefined,
            icon_name: undefined,
            icon_url: undefined,
        };

        if (_weatherArray.constructor === Array) {
            returnObject.code = _weatherArray[0].id || undefined;
            returnObject.caption = _weatherArray[0].main || undefined;
            returnObject.text = _weatherArray[0].description || undefined;
            returnObject.icon_name = _weatherArray[0].icon || undefined;
            returnObject.icon_url = _weatherArray[0].icon ? "https://openweathermap.org/img/w/"+_weatherArray[0].icon+".png" : undefined;
        }

        return returnObject;
    };

    this.getWeatherItemByJsonData = function (_item) {
        var weatherObject = apingModels.getNew("weather", this.getThisPlatformString());

        //fill _item in socialObject
        $.extend(true, weatherObject, {
            //weather_code: undefined,
            //weather_caption: undefined, //rain
            //weather_text : undefined, //light rain
            //weather_icon_name: undefined,
            //weather_icon_url: undefined,

            temp: _item.main ? _item.main.temp : undefined,
            pressure: _item.main ? _item.main.pressure : undefined,
            humidity: _item.main ? _item.main.humidity : undefined,
            temp_min: _item.main ? _item.main.temp_min : undefined,
            temp_max: _item.main ? _item.main.temp_max : undefined,
            sea_level: _item.main ? _item.main.sea_level : undefined,
            grnd_level: _item.main ? _item.main.grnd_level : undefined,
            wind_speed: _item.wind ? _item.wind.speed : undefined,
            wind_deg: _item.wind ? _item.wind.deg : undefined,
            //rain_duration: undefined,
            //rain_volume: undefined,
            clouds: _item.clouds ? _item.clouds.all : undefined,

            timestamp: Date.now(),
            date_time: new Date(),

            sunrise_timestamp : _item.sys ? _item.sys.sunrise : undefined,
            sunrise_date_time : _item.sys ? new Date( _item.sys.sunrise ) : undefined,
            sunset_timestamp : _item.sys ? _item.sys.sunset : undefined,
            sunset_date_time : _item.sys ? new Date( _item.sys.sunset ) : undefined,

            loc_city : _item.name || undefined,
            loc_city_id: _item.id || undefined,
            loc_country : _item.sys ? _item.sys.country : undefined,
            loc_lat : _item.coord ? _item.coord.lat : undefined,
            loc_lng : _item.coord ? _item.coord.lon : undefined,
            //loc_zip : false,
        });

        if(_item.rain) {
            var tempRainObject = this.getRainInfoFromObject(_item.rain);
            weatherObject.rain_duration = tempRainObject.duration || undefined;
            weatherObject.rain_volume = tempRainObject.volume || undefined;
        }

        if(_item.weather) {
            var tempWeatherObject = this.getWeatherInfoFromArray(_item.weather);
            weatherObject.weather_code = tempWeatherObject.code || undefined;
            weatherObject.weather_caption = tempWeatherObject.caption || undefined;
            weatherObject.weather_text = tempWeatherObject.text || undefined;
            weatherObject.weather_icon_name = tempWeatherObject.icon_name || undefined;
            weatherObject.weather_icon_url = tempWeatherObject.icon_url || undefined;
        }

        return weatherObject;
    };
}]);