// Name: Antonio Panebianco
// Student ID: 46409742

import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { HOLIDAY_API_URL } from "../config.js";
import { COUNTRY_CODE_API_URL } from "../config.js";
import { AVAILABLE_COUNTRIES_API_URL } from "../config.js";

class HolidayWidget extends LitElement {
  static styles = css`
    .holiday-widget {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 5px 10px;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      width: 230px;
      height: 270px;
      background: white;
      box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
      animation: loadIn 0.5s ease-in-out forwards;
    }

    :host h3 {
      font-weight: 800;
      line-height: 15px;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    :host select {
      padding: 5px;
      border-radius: 20px;
      background-color: #eef3f8;
      color: #444;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    .holiday-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
    }

    .holiday {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 5px 0;
      animation: bounce-in 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) both;
      cursor: pointer;
    }

    .holiday:hover,
    h3:hover {
      animation: holiday-hover 0.3s ease-in-out both;
    }

    .holiday h4 {
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      padding: 0;
      word-wrap: break-word;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }

    .holiday p {
      font-size: 14px;
      margin: 0;
      padding: 0 10px 0 10px;
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

    @keyframes holiday-hover {
      0% {
        transform: scale(1);
        cursor: default;
      }

      100% {
        transform: scale(1.03);
      }
    }

    @keyframes loadIn {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.05);
      }
      75% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes title-appear {
      from {
        opacity: 0;
        transform: translateX(150px);
      }
      to {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  `;

  static properties = {
    year: { type: Number },
    code: { type: String },
    _holidayData: { state: true },
  };

  constructor() {
    super();
    this.year = new Date().getFullYear(); // Getting full year for API URL
  }

  connectedCallback() {
    super.connectedCallback();
    this.callCountryCodeAPI(); // Calling waterfall of functions
  }

  callCountryCodeAPI() {
    try {
      const codeUrl = COUNTRY_CODE_API_URL;
      fetch(codeUrl)
        .then((response) => response.json())
        .then((data) => {
          this.code = data.country;
          this.getCountryList(); // We have the geolocation countryCode, now call function to populate dropdown
        });
    } catch (error) {
      console.error(`Failed to call country code API: ${error}`);
    }
  }

  getCountryList() {
    try {
      // Populate dropdown with options from list of countries API provided by the public holidays API
      fetch(AVAILABLE_COUNTRIES_API_URL)
        .then((response) => response.json())
        .then((countries) => {
          const select = this.shadowRoot.getElementById("country-select");
          countries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.countryCode;
            option.text = country.name;
            select.add(option);
          });
          this.countryChanged(); // Fix for event listener not working first time by calling it once before use
        });
    } catch (error) {
      console.error(`Failed to get country list: ${error}`);
    }
  }

  countryChanged() {
    try {
      // Called when dropdown option is selected
      const select = this.shadowRoot.getElementById("country-select");
      select.addEventListener("change", (event) => {
        this.code = event.target.value; // Set code to new country code
        this.callApi(); // Fetch public holidays with new country code
      });
    } catch (error) {
      console.error(`Failed to change holiday data: ${error}`);
    }
  }

  callApi() {
    // In case anything goes horribly wrong, setting defualt parameters
    if (this.code == null) {
      this.code = "AU";
    }
    if (this.year == null) {
      year = 2023;
    }
    try {
      // Calling primary API to get public holidays
      const updatedUrl = HOLIDAY_API_URL + `/${this.year}/${this.code}`;
      fetch(updatedUrl)
        .then((response) => response.json())
        .then((data) => {
          const currDate = new Date();
          // Filter to only show upcoming holidays yet to pass
          const upcomingDays = data.filter((holiday) => {
            const holidayDate = new Date(holiday.date);
            return holidayDate >= currDate;
          });
          this._holidayData = upcomingDays;
        });
    } catch (error) {
      console.error(`Failed to call core API holiday data: ${error}`);
    }
  }

  render() {
    if (this._holidayData) {
      const holidays = [];
      // Loop to render up to 4 holidays
      for (let i = 0; i < 4; i++) {
        const holiday = this._holidayData[i];
        if (holiday) {
          // Push to html, .slice is removing the year, since the user should know what year they are in
          holidays.push(html`
            <div class="holiday">
              <h4>${holiday.name}</h4>
              <p>${holiday.date.toString().slice(5, 10)}</p>
            </div>
          `);
        }
      }
      return html`
        <div class="holiday-widget">
          <h3>Public Holidays</h3>
          <select id="country-select" @change="${this.countryChanged}">
            <option selected disabled>Select country...</option>
          </select>
          <div class="holiday-container">${holidays}</div>
        </div>
      `;
    } else {
      // If we don't have the holiday data, fetch again
      this.callApi();
      return html`Loading...`;
    }
  }
}

customElements.define("holiday-widget", HolidayWidget);
