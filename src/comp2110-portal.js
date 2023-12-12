import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import "./components/widget-block.js";
import "./components/blog-block.js";
import "./components/widget-column.js";
import "./components/ad-widget.js";
import "./components/login-widget.js";
import "./components/currency-widget.js";
import "./components/weather-widget.js";
import "./components/date-fact-widget.js";
import "./components/holiday_widget.js";
import "./components/todo-widget.js";
import "./components/joke-widget.js";

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
    _location_lat: { type: Number, state: true },
    _location_long: { type: Number, state: true },
    _geoSupport: { type: String, state: true },
  };

  static styles = css`
    :host {
      min-height: 100vh;
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

    main {
      display: flex;
      background-color: #fff;
      display: grid;
      grid-template-columns: 1fr 250px;
    }

    blog-block {
      grid-column: 1/2;
    }

    widget-column {
      grid-column: 2/2;
      display: flex;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    body {
      margin: 0;
      padding: 0;
      position: relative;
      min-height: 110vh;
    }

    header {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      padding: 2rem 0;
      width: 100%;
      font-size: 1em;
      font-weight: 700;
      z-index: 999;
      margin: 0 0;
    }

    .logo {
      background-image: url("./img/MQ_INT_HOR_RGB_POS.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      height: 5rem;
      width: 12.65rem;
      font-size: 0px;
      padding-left: 100px;
    }

    header h1 {
      text-align: center;
      font-size: 1.5rem;
      margin: 0 0;
      padding: 0 1rem;
      white-space: nowrap;
      transition: height 0.2s, color 1s;
      font-weight: 800;
    }

    header h1:hover {
      color: #b8c9ea;
    }

    .main-nav {
      padding: 0 1rem;
      display: flex;
      align-items: center;
      margin-left: 0;
    }

    .main-nav ul {
      padding: 0rem 0rem;
    }

    .main-nav li {
      float: left;
      list-style-type: none;
    }

    .main-nav a,
    .main-nav span {
      color: black;
      padding: 12px;
      text-decoration: none;
      border-radius: 4px;
      transition: padding 0.2s, background-color 0.2s;
    }

    .main-nav span {
      background-color: #b1d6d6;
      color: white;
      width: 64.5px;
      height: 43px;
      cursor: pointer;
    }

    .main-nav span:hover,
    .main-nav a:hover {
      padding: 20px;
    }

    .main-nav a:hover,
    .main-nav span:hover {
      background-color: rgb(197, 207, 216);
      color: black;
    }

    .image-container {
      position: relative;
      text-align: center;
      height: 500px;
      width: 99%;
    }

    .main-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: 0 0 40px 40px;
      box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.3);
    }

    .image-text {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 3em;
      font-weight: 800;
    }

    .image-secondary-text {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, 100%);
      color: white;
      font-size: 1.5em;
      font-weight: 800;
    }

    widget-column,
    blog-block,
    .image-container {
      animation: loadIn 1s ease-in-out forwards;
    }

    @keyframes loadIn {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.005);
      }
      75% {
        transform: scale(0.995);
      }
      100% {
        transform: scale(1);
      }
    }

    @media (max-width: 1920px) {
      .image-container {
        max-width: 1650px;
      }
    }
  `;

  constructor() {
    super();
    this.header = "COMP2110 Portal";
    // checks for access to geolocation API, if not allowed then the user is alerted
    // if allowed the latitude and longitude coordinates are grabbed and are then passed
    // to the weather widget
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this._location_lat = position.coords.latitude;
        this._location_long = position.coords.longitude;
      });
    } else {
      window.alert("Browser does not support geolocation!");
      this._geoSupport = null;
    }
  }

  render() {
    return html`
      <header>
        <a href="#" class="logo">COMP 2110</a>
        <h1>${this.header}</h1>
        <nav class="main-nav">
          <ul class="main-menu">
            <li><span class="currentpage">Home</span></li>
            <li><a href="#" class="pagelink">About</a></li>
            <li><a href="#" class="pagelink">Blog</a></li>
          </ul>
        </nav>
        <login-widget></login-widget>
      </header>

      <main>
        <div class="image-container">
          <img
            class="main-image"
            src="./img/alt_header.jpg"
            alt="abstract image"
          />
          <div class="image-text">Welcome to the COMP2110 Portal!</div>
          <div class="image-secondary-text">Latest Blog Posts:</div>
        </div>
        <widget-column header="main">
          <ad-widget></ad-widget>
          <todo-widget></todo-widget>
          ${!this._geoSupport &&
          html`<weather-widget
            latitude=${this._location_lat}
            longitude=${this._location_long}
          ></weather-widget>`}
          <holiday-widget></holiday-widget>

          <date-fact-widget></date-fact-widget>

          <currency-widget></currency-widget>

          <joke-widget></joke-widget>

          <ad-widget></ad-widget>
        </widget-column>

        <blog-block></blog-block>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define("comp2110-portal", Comp2110Portal);
