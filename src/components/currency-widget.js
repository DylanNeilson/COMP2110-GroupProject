import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class CurrencyConv extends LitElement {
  static properties = {
    _entries: { state: true },
    convertedresult: { type: Number },
    amount: { type: Number },
    from: { type: String },
    to: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      width: 230px;
      height: 200px;
      position: relative;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
    }
    h1 {
      color: black;
      margin: 10px auto;
      font-size: 100%;
      padding-top: 30px;
    }

    .currency {
      display: inline-flex;
      gap: 10px;
      margin: auto auto;
    }
    .currcode {
      border-radius: 10px;
    }

    .input {
      margin-top: 5px;
      border-radius: 10px;
      width: 100px;
    }
    .output {
      width: 50%;
      border: 1px solid black;
      border-radius: 10px;
      background-color: white;
      font-size: 90%;
      margin-left: 25%;
      background-color: orange;
    }
    .container {
      display: flex;
      flex-direction: row;
      text-align: center;
      row-gap: 30px;
    }
    select {
      background-color: orange;
      border: none;
    }
    select option {
      background-color: white;
    }
    select:hover {
      transform: scale(1.1);
      transition: 0.4s;
    }
    .image {
      height: 50px;
      width: 50px;
      background-image: url("https://freepngimg.com/thumb/web_design/24684-5-right-arrow-transparent-picture.png");
      background-repeat: no-repeat;
      background-size: contain;
    }
  `;

  constructor() {
    super();
    this.amount = 0;
    this.from = "";
    this.to = "";
  }
  apicall() {
    fetch(`https://api.exchangerate.host/latest`)
      .then((data) => data.json()) //parse the response as json
      .then((data) => {
        this._entries = data.rates; //first api call fetches the rates
        // console.log(this._entries);
      });
  }

  apicallConvert() {
    this.from = this.shadowRoot.getElementById("firstcode").value; //variables that use shadowroot to get selected rates and inputed value
    this.to = this.shadowRoot.getElementById("secondcode").value;
    this.amount = this.shadowRoot.getElementById("inpt").value;

    if (this.amount > 0 && this.from != this.to) {
      //check for valid condition
      fetch(
        `https://api.exchangerate.host/convert?amount=${this.amount}&from=${this.from}&to=${this.to}`
      ) //api that handles the conversion
        .then((data) => data.json()) //parse the response as json
        .then((data) => {
          this.convertedresult = data.result; //stores the result of the conversion
        });
    }
    if (this.amount < 0) {
      //check for valid amount
      alert("Please enter a valid amount.");
    }
    if (this.from == this.to) {
      //check for same rate
      alert("Please select two different currencies and re-enter the value.");
    }
    if (this.amount == 0) {
      //check so that if amount 0 result is null and output will display nothing instead of last conversion
      this.convertedresult = null;
    }
  }

  render() {
    if (this._entries == null) {
      this.apicall(); //populates _entries
    }

    if (this._entries != null) {
      //only executes if entries is populated
      return html`
    <h1>Currency Converter</h1>
    <div class = "currency">
        <select id="firstcode" class="currcode">
         ${Object.keys(this._entries).map((val) => {
           //loops throught keys and returns an array with results
           return html`<option name="firstcode" value="${val}">
             ${val}
           </option> `; //populates options with mapped rates
         })}
        </select>
        <div class = "image">
           <img></img>
    </div>
        <select id = "secondcode" class="currcode">
        ${Object.keys(this._entries).map((val) => {
          return html`<option name="secondcode" value="${val}">
            ${val}
          </option> `;
        })}
        </select>
        </div>
        <div class = "currency">
        <input type="number" @keyup =${
          this.apicallConvert
        } id="inpt" class="input">
        <input type="number" value=${
          this.convertedresult
        } id="output" class="input" disabled name="">
      
       </div>
    `;
    } //apicallconvert is called on keyup meaning that the value is constantly being updated when entered
  }
}

customElements.define("currency-widget", CurrencyConv);
