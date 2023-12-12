import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { getUser, storeUser, deleteUser } from "../auth.js";
import { BASE_URL } from "../config.js";

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: { type: String, state: true },
    _token: { type: String, state: true },
  };

  static styles = css`
    :host {
      display: block;
      margin: auto 0 auto auto;
      padding-right: 50px;
    }

    :host input[name="username"],
    :host input[name="password"] {
      border-radius: 20px;
    }

    :host input[type="submit"] {
      background-color: #b1d6d6;
      border-radius: 4px;
      cursor: pointer;
      color: white;
      text-decoration: none;
      border: 0px;
      margin: 0 20px;
      font-size: 1rem;
      width: 64.5px;
      height: 43px;
      transition: height 0.2s, width 0.2s, background-color 0.2s;
    }
    :host input[type="submit"]:hover {
      width: 80px;
    }

    :host button {
      background-color: #b1d6d6;
      border-radius: 4px;
      cursor: pointer;
      color: white;
      text-decoration: none;
      border: 0px;
      margin: 0 20px;
      font-size: 1rem;
      width: 75px;
      height: 45px;
      transition: height 0.2s, width 0.2s, background-color 0.2s;
    }

    .logged_in {
      display: flex;
      align-items: center;
    }
    .blog_input_container {
    }

    .blog_input {
      border-radius: 20px;
      padding: 8px 0;
    }
  `;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  // function which sends COMP 2110 server blogs by sending a POST fetch request to send
  // inputted information about the blog title and content - the event of submitting blog  
  // is used to grab the value information of the title and content - the user is restricted 
  // from entering blank or empty inputs/ strings and is alerted to input correctly
  submitBlog(event) {
    event.preventDefault();
    const url = `${BASE_URL}blog`;
    const title = event.target.title.value;
    const content = event.target.blog.value;
    if (content === "" || title === "" || content === " " || title === " ") {
      alert("Please Enter Valid Inputs");
    } else {
      event.target.title.value = " ";
      event.target.blog.value = " ";
      fetch(url, {
        method: 'post',
        body: JSON.stringify({title, content}),
        headers: {'Authorization': `Basic ${this.user.token}`,'Content-Type': 'application/json'}
    }).then(result => result.json()).then(response => {
        
        const hold = response;
        this.refresh();
    })

    }
  }

  // alerts the user of an incorrect login as the response JSON contains an error field
  submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.error) {
          alert("Please Enter Correct Login Details");
        } else {
          this.user = response;
          storeUser(response);
          this.user = getUser();
          location.reload();
        }
      });
  }

  // logs the user out
  logout() {
    deleteUser();
    this.user = null;
    location.reload();
  }

  // reloads the page
  refresh() {
    location.reload();
  }

  render() {
    if (this.user) {
      return html`
        <div class="logged_in">
          <p>Logged in as ${this.user.name}</p>
          <button @click=${this.logout}>Logout</button>
          <div class="blog_input_container">
            <form @submit=${this.submitBlog}>
              Blog Title:
              <input name="title" class="blog_input" /> Body:
              <input name="blog" class="blog_input" />
              <input type="submit" value="Post" class="blog_post" />
            </form>
          </div>
        </div>
      `;
    }
    return html` <div class="login_form">
      <form @submit=${this.submitForm}>
        Username: <input name="username" /> Password:
        <input type="password" name="password" />
        <input type="submit" value="Login" />
      </form>
    </div>`;
  }
}

customElements.define("login-widget", LoginWidget);
