import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { getUser } from "../auth.js";
import { BASE_URL } from "../config.js";

class TodoWidget extends LitElement {
  static properties = {
    header: { type: String },
    _user: { type: String, state: true },
    _tasks: { state: true },
  };

  static styles = css`
    #task-widget {
      background: white;
      border-radius: 20px;
      box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
      animation: appear 500ms ease-out forwards;
      width: 230px;
      min-height: 250px;
      position: relative;
      margin: 20px 10px 10px 10px;
    }

    :host h2 {
      font-weight: 800;
      margin: 5px auto;
      padding-top: 10px;
    }

    #task-widget dl {
      line-height: 0.95;
      padding-right: 5%;
      padding-bottom: 10px;
    }

    #task-widget dl dt {
      cursor: pointer;
      counter-increment: item;
      font-size: large;
      font-style: italic;
      font-weight: bold;
      margin-left: 0px;
    }

    #task-widget dl dd {
      padding-bottom: 15px;
      padding-top: 15px;
      font-size: medium;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      filter: none;
    }

    #task-widget dl dd:before {
      content: "⭐";
      display: inline;
    }

    #task-widget dl dd:hover {
      scale: 1.05;
      -webkit-transition: scale 0.5s;
      transition: scale 0.5s;
      font-size: medium;
    }

    #task-widget dl dt:before {
      content: counter(item);
      left: 0;
      margin-right: 5px;
      font-size: 80%;
      height: 100px;
      background-color: #b8b8b8;
      color: white;
      font-weight: bold;
      font-style: normal;
      padding: 4px 8px;
      border-radius: 8px;
    }

    :host button {
      background-color: #b1d6d6;
      border-radius: 4px;
      cursor: pointer;
      color: white;
      text-decoration: none;
      border: 0px;
      margin: 10px 20px 0px 20px;
      font-size: 1rem;
      width: 25px;
      height: 45px;
      transition: height 0.2s, width 0.2s, background-color 0.2s;
    }

    :host button:hover {
      width: 90px;
      background-color: rgb(197, 207, 216);
    }

    :host button:hover span {
      display: none;
      transition: opacity 1s ease-out;
      opacity: 0;
    }
    :host button:hover:before {
      content: "Add Task";
      overflow: hidden;
      white-space: nowrap;
    }

    input {
      border-radius: 20px;
      padding: 0.5rem;
    }

    .login-required {
      padding: 100px 10px;
      font-weight: 800;
    }
  `;

  constructor() {
    super();
    this._user = getUser();
  }

  // function which accesses the COMP 2110 server tasks by sending a GET fetch request 
  // with a specified count for number of tasks and reads the JSON data into a global variable 
  getTasks() {
    const url = `${BASE_URL}tasks?count=3`;
    try{
      fetch(url, {
        method: "get",
        headers: {
          Authorization: `Basic ${this._user.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((response) => {
          this._tasks = response;
        });

    }catch(error){
      console.log("There was problems accessing COMP2110 Tasks", error);
    }
  }

  // function which sends the COMP 2110 server tasks a status update for a specific task
  // by sending a POST fetch request with a id of a task which is captured from the
  // click event of each <dt> as they are the ids of each task - getTasks() is then
  // called to update the widget with the current version of tasks 
  taskStatusUpdate(event) {
    const id = event.target.innerText;
    const url = `${BASE_URL}tasks/${id}`;
    const status = "completed";
    try{
      fetch(url, {
        method: "post",
        body: JSON.stringify({ status }),
        headers: {
          Authorization: `Basic ${this._user.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((response) => {
          const hold = response;
          this.getTasks();
        });

    } catch(error){
      console.log("There was problems accessing COMP2110 Tasks", error);
    }
  }

  // function which sends the COMP 2110 server tasks a newly created task
  // by sending a POST fetch request with the text for the task that is 
  // accessed through the shadowRoot of the input - getTasks() is then
  // called to update the widget with the current version of tasks 
  postTasks() {
    const url = `${BASE_URL}tasks`;
    const text = this.shadowRoot.getElementById("task").value;
    if (text != "" && text != " ") {
      this.shadowRoot.getElementById("task").value = " ";
      try{
        fetch(url, {
          method: "post",
          body: JSON.stringify({ text }),
          headers: {
            Authorization: `Basic ${this._user.token}`,
            "Content-Type": "application/json",
          },
        })
          .then((result) => result.json())
          .then((response) => {
            const hold = response;
            this.getTasks();
          });

      }catch(error){
        console.log("There was problems accessing COMP2110 Tasks", error);
      }
    } else {
      alert("Task-widget: Requires Correct Non-Empty Input");
    }
  }

  render() {
    if (this._user) {
      //checks if user is logged in if not the widget will prompt them to login to access all features
      if (this._tasks) {
        // checks if tasks have been retrieved if not the function getTasks() is called and the widget indicates the data is loading
        // if the tasks are retrieved then they are listed out - if the status of the task is pending then clicking on
        // <dt> id tag will update the status to "completed" - if the status of the task is completed then the task will
        // be crossed out
        return html`
          <div class="widget" id="task-widget">
            <h2>Tasks</h2>
            <input id="task" />
            <button @click=${this.postTasks}><span>+</span></button>
            <dl>
              ${this._tasks.tasks.map(
                (value) =>
                  value.status != "completed"
                    ? html`<dt
                          @click="${(e) => this.taskStatusUpdate(e)}"
                          ;
                          id="id"
                        >
                          ${value.id}
                        </dt>
                        <dd>${value.text}</dd>`
                    : html`<dt id="id"><s>${value.id}</s></dt>
                        <dd><s>${value.text}</s></dd>`
              )}
            </dl>
          </div>
        `;
      } else {
        this.getTasks();
        return html` <div class="widget" id="task-widget">Loading...</div> `;
      }
    } else {
      this.render;
      return html`
        <div class="widget" id="task-widget">
          <div class="login-required">Please Login to Access All Features</div>
        </div>
      `;
    }
  }
}

customElements.define("todo-widget", TodoWidget);
