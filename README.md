[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

**_apiNG-plugin-openweathermap_** is a [OpenWeatherMap API](http://openweathermap.org/api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `weather`**
* Used promise library: [angular-openweathermap-api-factory](https://github.com/JohnnyTheTank/angular-openweathermap-api-factory) _(included in minified distribution file)_

# Documentation
    I.   INSTALLATION
    II.  API KEY
    III. USAGE

## I. INSTALLATION
    a) Get files
    b) Include files
    c) Add dependencies
    d) Add the plugin

### a) Get files
You can choose your preferred method of installation:

* Via bower: `bower install apiNG-plugin-openweathermap --save`
* Download from github: [apiNG-plugin-openweathermap.zip](https://github.com/JohnnyTheTank/apiNG-plugin-openweathermap/zipball/master)

### b) Include files
Include `apiNG-plugin-openweathermap.min.js` in your apiNG application
```html
<script src="bower_components/apiNG-plugin-openweathermap/dist/apiNG-plugin-openweathermap.min.js"></script>
```

### c) Add dependencies
Add the module `jtt_aping_openweathermap` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_openweathermap']);
```

### d) Add the plugin
Add the plugin's directive `aping-openweathermap="[]"` to your apiNG directive and configure your requests (_**III. USAGE**_)
```html
<aping
    template-url="templates/weather.html"
    model="weather"
    aping-openweathermap="[{'cityName':'munich'}]>
</aping>
```

## II. API KEY
    a) Get your `api_key`
    b) Insert your `api_key` into `aping-config.js`

### a) Get your `api_key`

1. Login on [openweathermap.org](http://openweathermap.org/)
2. Open [home.openweathermap.org](http://home.openweathermap.org/)
    * There is your `api_key`

### b) Insert your `api_key` into `aping-config.js`
Open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
apingApp.config(['$provide', function ($provide) {
    $provide.constant("apingApiKeys", {
        //...
        'openweathermap': [
            {'api_key':'<YOUR_OPENWEATHERMAP_API_KEY>'}
        ],
        //...
    });

    $provide.constant("apingDefaultSettings", {
        //...
    });
}]);
```

:warning: Replace `<YOUR_OPENWEATHERMAP_API_KEY>` with your `api_key`

## III. USAGE
    a) Models
    b) Requests
    c) Rate limit

### a) Models
Supported apiNG models

|  model   | content |
|----------|---------|
| `weather` | **weather data** |


### b) Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.


#### Requests by City name
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`cityName`** | `berlin` |  | You can call by city name | no |
| **`countryCode`** | `de` |  | ISO 3166 country codes | yes |
| **`type`** | `like` |  | To set the accuracy level either use the `accurate` or `like` type parameter. `accurate` returns exact match values. `like` returns results by searching for that substring | yes |
| **`units`** | `imperial` | `metric` | Temperature is available in Fahrenheit, Celsius and Kelvin units. For temperature in Fahrenheit use `imperial`. For temperature in Celsius use `metric`. For temperature in Kelvin use `kelvin` | yes |
| **`language`** | `ru` | `en`  | English: `en`, Russian: `ru`, Italian: `it`, Spanish: `es` (or `sp`), Ukrainian: `uk` (or `ua`), German: `de`, Portuguese: `pt`, Romanian: `ro`, Polish: `pl`, Finnish: `fi`, Dutch: `nl`, French: `fr`, Bulgarian: `bg`, Swedish: `sv` (or `se`), Chinese Traditional: `zh_tw`, Chinese Simplified: `zh` (or `zh_cn`), Turkish: `tr`, Croatian: `hr`, Catalan: `ca`  | yes |

Sample requests:
* `[{'cityName':'london'}, {'cityName':'ney work city', 'units':'imperial'}]`
* `[{'cityName':'berlin', 'countryCode':'de', 'language':'de'}]`

#### Requests by City ID
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`cityId`** | `2172797` |  | You can call by city ID. API responds with exact result. List of city ID city.list.json.gz can be downloaded [here](http://bulk.openweathermap.org/sample/). | no |
| **`units`** | `imperial` | `metric` | Temperature is available in Fahrenheit, Celsius and Kelvin units. For temperature in Fahrenheit use `imperial`. For temperature in Celsius use `metric`. For temperature in Kelvin use `kelvin` | yes |
| **`language`** | `ru` | `en`  | English: `en`, Russian: `ru`, Italian: `it`, Spanish: `es` (or `sp`), Ukrainian: `uk` (or `ua`), German: `de`, Portuguese: `pt`, Romanian: `ro`, Polish: `pl`, Finnish: `fi`, Dutch: `nl`, French: `fr`, Bulgarian: `bg`, Swedish: `sv` (or `se`), Chinese Traditional: `zh_tw`, Chinese Simplified: `zh` (or `zh_cn`), Turkish: `tr`, Croatian: `hr`, Catalan: `ca`  | yes |

Sample requests:
* `[{'cityId':'2172797', 'units':'imperial'}]`

#### Requests by Zip code
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`zip`** | `94040` |  | You can call by zip Code | no |
| **`countryCode`** | `us` |  | ISO 3166 country codes | no |
| **`units`** | `imperial` | `metric` | Temperature is available in Fahrenheit, Celsius and Kelvin units. For temperature in Fahrenheit use `imperial`. For temperature in Celsius use `metric`. For temperature in Kelvin use `kelvin` | yes |
| **`language`** | `ru` | `en`  | English: `en`, Russian: `ru`, Italian: `it`, Spanish: `es` (or `sp`), Ukrainian: `uk` (or `ua`), German: `de`, Portuguese: `pt`, Romanian: `ro`, Polish: `pl`, Finnish: `fi`, Dutch: `nl`, French: `fr`, Bulgarian: `bg`, Swedish: `sv` (or `se`), Chinese Traditional: `zh_tw`, Chinese Simplified: `zh` (or `zh_cn`), Turkish: `tr`, Croatian: `hr`, Catalan: `ca`  | yes |

Sample requests:
* `[{'cityName':'94040', 'countryCode':'us', 'language':'de'}]`

#### Requests by Coordinates
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`lat`** | `-13.163333` |  | latitude of the location of your interest | no |
| **`lng`** | `-72.545556` |  | longitude of the location of your interest | no |
| **`units`** | `imperial` | `metric` | Temperature is available in Fahrenheit, Celsius and Kelvin units. For temperature in Fahrenheit use `imperial`. For temperature in Celsius use `metric`. For temperature in Kelvin use `kelvin` | yes |
| **`language`** | `ru` | `en`  | English: `en`, Russian: `ru`, Italian: `it`, Spanish: `es` (or `sp`), Ukrainian: `uk` (or `ua`), German: `de`, Portuguese: `pt`, Romanian: `ro`, Polish: `pl`, Finnish: `fi`, Dutch: `nl`, French: `fr`, Bulgarian: `bg`, Swedish: `sv` (or `se`), Chinese Traditional: `zh_tw`, Chinese Simplified: `zh` (or `zh_cn`), Turkish: `tr`, Croatian: `hr`, Catalan: `ca`  | yes |

Sample requests:
* `[{'lat':'-13.163333', 'lng':'-72.545556', 'language':'es'}]`

### c) Rate limit
Visit the official [OpenWeatherMap Price List](http://openweathermap.org/price)

> | Calls per  | Free |
> |----------|---------|
 | **minute** (no more than) | 60 |
| **day** (no more than) | 50,000 |


# Licence
MIT

