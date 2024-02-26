import { html, css, LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class TallyCounter extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      padding: 20px;
      text-align: center;
      font-size: 2rem;
      color: var(--tally-counter-text-color, black);
    }
    button {
      background-color: #4caf50; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #555; /* Gray */
      cursor: not-allowed;
    }
  `;

  static properties = {
    count: { type: Number },
    min: { type: Number },
    max: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
    this.min = 0;
    this.max = 10;
  }

  render() {
    return html`
      <div>Count: ${this.count}</div>
      <button @click="${this.decrement}" ?disabled="${this.count === this.min}">-</button>
      <button @click="${this.increment}" ?disabled="${this.count === this.max}">+</button>
      <div>${this.getMessage()}</div>
    `;
  }

  decrement() {
    this.count--;
  }

  increment() {
    this.count++;
  }

  getMessage() {
    if (this.count === this.min) {
      return "Minimum Reached";
    } else if (this.count === this.max) {
      return "Maximum Reached";
    } else {
      return "Normal";
    }
  }
}

customElements.define("tally-counter", TallyCounter);
