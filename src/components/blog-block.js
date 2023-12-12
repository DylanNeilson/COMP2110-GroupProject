/**
 * A Blog widget that displays blog posts pulled from
 * an API
 *
 * <blog-block></blog-block>
 */

import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { BASE_URL } from "../config.js";

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true },
  };

  static styles = css`
    :host {
      padding-left: 100px;
      padding-top: 10px;
    }

    .blogpost {
      text-align: left;
      transition: background-color 0.7s;
      width: 95%;
      padding-bottom: 20px;
    }

    .blogpost h2 {
      text-align: center;
      background-color: #b1d6d6;
      margin-top: 0px;
      padding: 30px 0;
      box-shadow: -10px 15px 10px 2px rgba(0, 0, 0, 0.1);
      transition: background-color 0.7s;
      border-radius: 20px;

      overflow: hidden;
      word-wrap: break-word;
    }

    .blogpost:hover {
      background-color: rgb(234, 236, 236);
      border-radius: 20px;
    }

    .blog h2:hover {
      background-color: rgb(197, 207, 216);
    }

    :host p {
      padding: 0 100px;
      word-wrap: break-word;
      max-width: 1400px;
    }

    @media (min-width: 2200px) {
      .blogpost h2 {
        max-width: 2200px;
      }
    }

    @media (max-width: 1920px) {
      .blogpost h2 {
        max-width: 1500px;
      }
      .blogpost p {
        max-width: 1350px;
      }
    }
  `;

  constructor() {
    super();

    const url = `${BASE_URL}blog?count=12`;
    fetch(url)
      .then((response) => response.json())
      .then((posts) => {
        this._posts = posts.posts;
      });
  }

  // A simple formatter that just splits text into paragraphs and
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    var paragraphs = "";
    if (text) {
      paragraphs = text.split("\r\n");
    } else {
      return html`<p>No bueno!</p>`;
    }
    return paragraphs.map((paragraph) => html`<p>${paragraph}</p>`);
  }

  render() {
    if (!this._posts) return html`Loading...`;

    return html`
      ${this._posts.map(
        (post) => html`<div class="blogpost">
          <h2>${post.title}</h2>
          <h3>By ${post.name}</h3>
          ${BlockBlock.formatBody(post.content)}
        </div>`
      )}
    `;
  }
}

customElements.define("blog-block", BlockBlock);
