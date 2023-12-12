import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class jokewidget extends LitElement {
  static properties = {
    _dadjoke: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      width: 230px;
      height: 270px;
      background-color: white;
      position: relative;
      margin: 20px 5px;
      border-radius: 20px;
      box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
    }
    button {
      animation: change-background 4s ease infinite;
      width: 80px;
      height: 80px;
      border: none;
      border-radius: 100px;
      margin-top: 5%;
    }
    button:hover {
      transform: scale(1.1);
      transition: 0.4s;
    }
    p {
      white-space: pre-line;
      text-align: center;
      animation: change-background-alt 4s ease infinite;
      font-size: 12px;
      width: 90%;
      height: 140px;
      border: none;
      border-radius: 20px;
      filter: blur(8px);
      margin-left: 5%;
      padding: 10px 0;
    }
    p:hover {
      transform: scale(1.1);
      transition: 0.4s;
      filter: blur(0);
    }
    .container {
    }

    @keyframes change-background {
      0% {
        background: orange;
      }
      50% {
        background: yellow;
      }
      100% {
        background: orange;
      }
    }
    @keyframes change-background-alt {
      0% {
        background: yellow;
      }
      50% {
        background: orange;
      }
      100% {
        background: yellow;
      }
    }
  `;

  constructor() {
    super();
  }
  joke() {
    //function that is called to get joke
    let config = {
      headers: {
        accept: "application/json", //sets output type to json
      },
    };
    fetch(`https://icanhazdadjoke.com/`, config)
      .then((data) => data.json()) //parses response as json
      .then((data) => {
        this._dadjoke = data.joke; //assigns the joke to dadjoke
      });
  }

  render() {
    //joke is generated on click
    return html`
      <div class="container">
        <button @click=${this.joke}>Tell me a joke!</button>
        <p>${this._dadjoke}</p>
      </div>
    `;
  }
}

customElements.define("joke-widget", jokewidget);
