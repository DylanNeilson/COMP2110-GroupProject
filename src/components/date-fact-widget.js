// Name: Dylan Neilson
// Student ID: 47004029

import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class DateFact extends LitElement {
  // Define styles for the component
  static get styles() {
    return css`
      :host {
        display: block;
        width: 230px;
        height: 230px;
        background-color: white;
        box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
        border-radius: 20px;
        position: relative;
        margin: 20px 5px;
      }

      h3 {
        padding-top: 10px;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 180px;
        border-radius: 20px;
      }

      .content {
        display: none;
        padding: 10px;
        font-size: 14px;
        max-width: 200px;
      }

      .label {
        display: block;
        font-weight: bold;
        font-size: 40px;
        color: white;
      }

      .widget-button {
        margin-top: -40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: orange;
        width: 115px;
        height: 115px;
        border-radius: 60px;
        transition: 0.3s;
        animation: attention 3s ease 0s infinite normal forwards;
      }

      @keyframes attention {
        0% {
          animation-timing-function: ease-out;
          transform: scale(1);
          transform-origin: center center;
        }

        25% {
          animation-timing-function: ease-in;
          transform: scale(0.91);
        }

        50% {
          animation-timing-function: ease-out;
          transform: scale(0.98);
        }

        75% {
          animation-timing-function: ease-in;
          transform: scale(0.87);
        }

        100% {
          animation-timing-function: ease-out;
          transform: scale(1);
        }
      }

      .widget-button:hover {
        width: 100%;
        height: 100%;
        border-radius: 50px;
        animation-play-state: paused;
      }

      .widget-button:hover > .content {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .widget-button:hover > .label {
        display: none;
      }
    `;
  }
  // Define properties for the component
  static get properties() {
    return {
      // Store fact data as a string
      _factData: { type: String },
    };
  }
  // Initialize _factData property to an empty string
  constructor() {
    super();
    this._factData = null;
  }
  // When the component is added to the DOM, call the API to get a fact
  connectedCallback() {
    super.connectedCallback();
    this.callApi();
  }
  // Call Numbers API
  callApi() {
    // Get the current date
    const today = new Date();
    // Get the current month and add 1 to convert from 0-based to 1-based index
    const currentMonth = today.getMonth() + 1;
    // Get the current day of the month
    const currentDay = today.getDate();
    // Construct the URL for the API call using the current month and day
    const url = `http://numbersapi.com/${currentMonth}/${currentDay}/date`;
    // Fetch data from the URL
    fetch(url)
      .then((response) => response.text()) // Parse the response body as text
      .then((data) => {
        // Process the fetched data
        this._factData = data; // Store the fact data in the component's state
        this.requestUpdate(); // Request an update to re-render the component with the new state
      })
      .catch((error) => {
        // Handle errors that occur during the fetch
        console.error("Error fetching data:", error); // Log the error to the console
      });
  }
  // Render the component
  render() {
    // If fetch was successfull
    if (this._factData) {
      return html`
        <h3>Did you know?</h3>
        <div class="container">
          <div class="widget-button">
            <div class="label">?</div>
            <div class="content">${this._factData}</div>
          </div>
        </div>
      `;
    }
    // If data hasn't been fetched yet.
    else {
      return html`Loading...`;
    }
  }
}
// Register the component as a custom element in the browser
customElements.define("date-fact-widget", DateFact);
