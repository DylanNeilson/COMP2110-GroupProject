import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { WEATHER_API_URL } from "../config.js";

class WeatherWidget extends LitElement {
  //idea for widgets - could use widget block as the conforming style for widget
  static styles = css`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .weather-widget {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .weather-display {
      margin: 10px 10px 20px 10px;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      width: 230px;
      height: 270px;
      background: white;
      box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }
    .weather-display h1 {
      position: absolute;
      font-family: "Lato", sans-serif;
      font-weight: 300;
      font-size: 45px;
      color: #b8b8b8;
      left: 25px;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    .location-details {
      padding: 0px;
      margin: 0px;
      position: absolute;
      font-family: "Lato", sans-serif;
      font-weight: 300;
      font-size: 16px;
      color: #d2d2d2;
      bottom: 0;
      left: 25px;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    .time {
      font-size: 0px;
    }

    .weather-widget:hover .weather-display .time {
      position: absolute;
      font-family: "Lato", sans-serif;
      font-weight: 300;
      font-size: 12px;
      color: #d2d2d2;
      top: 100px;
      left: 35px;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    .city {
      position: absolute;
      font-family: "Lato", sans-serif;
      font-weight: 300;
      font-size: 28px;
      color: #d2d2d2;
      bottom: 0;
      left: 25px;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    .icon {
      position: relative;
      width: 50px;
      height: 50px;
      top: 0;
      float: right;
      margin: 40px 40px 0 0;
      animation: weather-icon-move 5s ease-in-out infinite;
    }
    .sun {
      background: #ffcd41;
      border-radius: 50%;
      box-shadow: rgba(255, 255, 0, 0.1) 0 0 0 4px;
      animation: light 800ms ease-in-out infinite alternate,
        weather-icon-move 5s ease-in-out infinite;
    }
    .cloud {
      margin-right: 60px;
      background: #b6cede;
      border-radius: 20px;
      width: 25px;
      height: 25px;
      box-shadow: #b6cede 24px -6px 0 2px, #b6cede 10px 5px 0 5px,
        #b6cede 30px 5px 0 2px, #b6cede 11px -8px 0 -3px,
        #b6cede 25px 11px 0 -1px;
    }
    .cloud:after {
      content: "";
      position: absolute;
      border-radius: 10px;
      background-color: transparent;
      width: 4px;
      height: 12px;
      left: 0;
      top: 31px;
      transform: rotate(30deg);
      animation: rain 800ms ease-in-out infinite alternate;
    }
    @keyframes rain {
      from {
        box-shadow: #2092a9 8px 0px, #2092a9 32px -6px, #2092a9 20px 0px;
      }
      to {
        box-shadow: #2092a9 8px 6px, #2092a9 32px 0px, #2092a9 20px 6px;
      }
    }
    @keyframes weather-icon-move {
      50% {
        transform: translateY(-8px);
      }
    }

    @keyframes light {
      from {
        box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 10px;
      }
      to {
        box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 17px;
      }
    }

    @keyframes bounce-in {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  static properties = {
    latitude: { type: Number },
    longitude: { type: Number },
    _currentWeather: { type: Boolean, state: true },
    _weatherData: { state: true },
    _locationData: { state: true },
  };

  constructor() {
    super();
    this._currentWeather = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  // function which accesses the weather API by sending a GET fetch request with passed 
  // latitude and longitude values from users current session and 
  // reads the JSON data into a global variable - error handling was implemented
  // incase any issues occurred with the fetch request 
  callApi() {
    const updatedUrl =
      WEATHER_API_URL +
      `?latitude=${this.latitude}&longitude=${this.longitude}&current_weather=${this._currentWeather}`;
    try {
      fetch(updatedUrl)
        .then((response) => response.json())
        .then((data) => {
          this._weatherData = data;
        });
    } catch (error) {
      console.log("There was problems accessing Weather API", error);
      
    }
  }

  // function which accesses geolocation-db by sending a GET fetch request and 
  // reads the JSON data into a global variable - error handling was implemented
  // as it was noted during testing that some add blockers interferred with the request 
  getLocationDetails() {
    const url = "https://geolocation-db.com/json/";
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this._locationData = data;
        });
    } catch (error) {
      console.log("There was problems accessing geolocation", error);
      this._locationData = "Error: can't access geolocation";
    }
  }

  render() {
    if (this._weatherData && this._locationData) {
      if (this._weatherData.current_weather.temperature >= 20) {
        //switches for type of weather icon that will be displayed when the temperature is >=20 its a sun, 
        //when < 20 a rainy cloud
        return html`
                        <div class="weather-widget">
                            <div class="weather-display">
                                <div class="icon sun"></div>
                                    <h1>${this._weatherData.current_weather.temperature}°</h1>
                                    <p class="time">${this._weatherData.current_weather.time}</p>
                                    <p class="city">${this._locationData.city}</p>
                                    <p class="location-details"> ${this._locationData.country_name}, ${this._locationData.state} </h5> 
                            </div>
                        </div>
                        
                        
                    `;
      } else if (this._weatherData.current_weather.temperature < 20) {
        return html`
          <div class="weather-widget">
            <div class="weather-display">
              <div class="icon cloud"></div>
              <h1>${this._weatherData.current_weather.temperature}°</h1>
              <p class="time">${this._weatherData.current_weather.time}</p>
              <p class="city">${this._locationData.city}</p>
              <p class="location-details">
                ${this._locationData.country_name}, ${this._locationData.state}
              </p>
            </div>
          </div>
        `;
      }
    } else if (this._weatherData) {
      if (this._weatherData.current_weather.temperature >= 20) {
        return html`
          <div class="weather-widget">
            <div class="weather-display">
              <div class="icon sun"></div>
              <h1>${this._weatherData.current_weather.temperature}°</h1>
              <p class="time">${this._weatherData.current_weather.time}</p>
              <p class="city">${this._locationData}</p>
              <p class="location-details">
                ${this._locationData}, ${this._locationData}
              </p>
            </div>
          </div>
        `;
      } else if (this._weatherData.current_weather.temperature < 20) {
        return html`
                        <div class="weather-widget">
                            <div class="weather-display">
                                <div class="icon cloud"></div>
                                <h1>${this._weatherData.current_weather.temperature}°</h1>
                                <p class="time">${this._weatherData.current_weather.time}</p>
                                <p class="city">${this._locationData}</p>
                                <p class="location-details"> ${this._locationData}, ${this._locationData} </h5>
                            </div>
                        </div>

                    `;
      }
    } else {
      // if the data is null for either _weatherData and _locationData (which should be the case initially) 
      // then the functions which fetch their data will be called - additionally if only _weatherData is not null then
      // the widget will display that data as it still inidcates the temperature and error information will populate
      // _locationData - Loading... will be displayed whilst the functions have been called 
      this.callApi();
      this.getLocationDetails();
      return html`Loading...`;
    }
  }
}

customElements.define("weather-widget", WeatherWidget);
