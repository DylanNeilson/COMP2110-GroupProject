import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { BASE_URL } from "../config.js";

class AdWidget extends LitElement {
  static properties = {
    adUrl: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      width: 230px;
      height: 230px;
      background-color: #b1d6d6;
      border-radius: 20px;
      margin: 0px 10px 10px 10px;
      position: relative;
    }
    :host p {
      position: relative;
      top: -50px;
      text-align: right;
      padding-right: 10px;
      z-index: 0;
      color: white;
      font-size: 0;
    }

    :host img {
      text-align: center;
      width: 230px;
      height: 230px;
    }
  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL}adserver`;
  }

  render() {
    return html`
      <div>
        <img src=${this.adUrl} alt="Advertisment" />
        <p>Advertisment</p>
      </div>
    `;
  }
}

customElements.define("ad-widget", AdWidget);
