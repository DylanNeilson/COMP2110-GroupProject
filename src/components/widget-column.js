import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class WidgetColumn extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    :host {
      position: absolute;
      right: 0;
    }
  `;

  constructor() {
    super();
    this.header = "Widgets";
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("widget-column", WidgetColumn);
