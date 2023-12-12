# COMP2110 Portal - Group 93

## Deployment/Updates

To host our site, we are currently using the Workers and Pages serverless hosting feature from Cloudflare.

You can access Cloudflare from https://www.cloudflare.com/en-au/

The project is currently deployed and visible at this link:
https://comp2110-group93.pages.dev/

To publish updates to the live deployed website, follow the following steps;
### First, change branches to the deployment branch, the branch the site is currently using to run.

Then, if you haven't already, install wrangler for Cloudflare.

```bash
npm install wrangler
```

Then login and authenticate via the browser using the account we have set up for this website

```bash
npx wrangler login
```

For reference, our project is called comp2110-group93

To publish an update to the live site, use this command:

```bash
npx wrangler pages publish .
```

## Installation

The project has no external dependencies, it uses Lit via a CDN load directly into
the HTML page. Node is used only to run a local HTTP server.

```bash
npm install
```

Will install the `http-server` node module.

```bash
npm start
```

will run the server.

## Backend Server

Your portal will make use of a server that we have implemented that is running on <https://comp2110-portal-server.fly.dev/>. Documentation for the services it provides
is in [this Github repository](https://github.com/COMP2110-2023/comp2110-portal-server/).

## Starter Code

The module `config.js` exports a variable `BASE_URL` that contains the address
of the backend server. This is used for example in the blog-block component
to define the URL endpoint. You may also want to use it if you make use of
other API endpoints from the server (eg. tasks).

The code contains implementations of the following components:

### `<comp2110-portal>`

This is a container for the whole portal application and currently contains
some of the pre-defined widgets. You can modify this as you see fit to achieve
your overall application layout and behaviour.

### `<widget-column>`

This component implements a container for widgets and can be used to define
the style information and layout for the group. You can modify this if you
wish or replace it with something else.

### `<login-widget>`

This component implements a login form that will allow a user to authenticate to the
backend server. If the user is logged in, the component displays their name and
a logout button rather than the form.

Authentication is implemented in the `auth.js` module. Once a user login succeeds,
the current user details are stored in the browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) so that
they persist over browser sessions. In your code, you can use the function
`getUser()` from the `auth.js` module to find out if a user is logged in and get
their details.

### `<blog-block>`

This component implements a blog using the backend API from the COMP2110 portal server.
You can modify this component if you wish to change the layout of posts or the overall look and feel.

This component only supports reading posts although the backend API allows posting new blog
posts if you are logged in. One possible extension of this component would be to allow
posting in some way.

### `<ad-widget>`

This component displays an advertisement from the backend portal server. You should not
modify it and it should appear somewhere in your page design.

## Widgets to Implement

- Weather forecast with data from <https://api.open-meteo.com/v1/forecast>, e.g.
  [this example](https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true). Location can be fixed or derived from the Javascript
  [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

- Currency conversion with data from <https://exchangerate.host/> e.g.
  [USD to EUR](https://api.exchangerate.host/convert?from=USD&to=EUR). Your widget should
  allow the user to input an amount to be converted and possibly select the to/from
  currencies.

- A widget showing a random fact about the current date from <http://numbersapi.com/>,
  e.g. <http://numbersapi.com/3/22/date>.

- A widget showing the upcoming public holidays from <https://date.nager.at>, e.g.
  [the 2023 Australian holidays](https://date.nager.at/api/v2/publicholidays/2023/AU).
  Your widget could allow selection of the country who's holidays are being displayed.

# Documentation

## Blogposting

Developer: Joshua Devine

Implemented blogposting which is accessible by the user when they login in the header. A user is required to be logged in to access blogposting, as sending a POST request containing the blog title and blog post to the server, requires authentication in the form of a user authentication token which is sent from the server when the user logs in. A user can enter any details into the blogpost title and blogpost fields besides empty strings, empty strings will trigger an alert to the user of the incorrect input. The page reloads/ refreshes whenever a blogpost is created and the server responds, so that the newly created blogpost can be seen/ updated. The count for blogposts shown is 12 as this seems to be a good amount which fills the page, but doesn't break/ overload the style/ design of the page.

Future Work: A seperate navigatable page for blog posting rather than in the header - which has more functionality for customising the blogpost/ blogpost title.

## Weather Widget

Developer: Joshua Devine

!!! Important: For the Geolocation API to access the lattitude and longitude coordinates of your machine you need to be in a secure instance of
http. This required access worked for the local addresses http://127.0.0.1:8013 and http://localhost:8013/ .

Was reponsible for developing a weather widget using the Geolocation API, open-meteo API and geolocation-db. The Geolocation API was used to get the lattitude and longitude coordinates of the users machine. These coordinates were then passed into the weather-widget through public global variables where a request to open-meteo API could be made to get the weather for the current location. To build the desired weather-widget more information was needed as open-meteo API did not provide information about the name of the country or name of closest city. Thus, the use of gelocation-db was used to access this data and present a cohesive weather-widget.

Future Work: More extensive outlook of the week and the weather for each day. More variations in weather icons.

## Todo Task Widget - Extra

Developer: Joshua Devine

Like the blogposts a user has to be logged in to access the todo list widget as the POST requests require authorisation, if not then the widget space will prompt the user to login to access the todo task widget. The count of tasks was set to 3 as to not overload/ break the widget. Since no functionality for deleting widgets exisits on the server side, when a user clicks on the <dt> tag/ id of a pending task, it transforms/ strikes a line through the 'task.text' to indicate the status change of the task. Additionally, users can add tasks by entering any input into the input field and pressing the add button to trigger the event. Inputs which are blank are considered invalid and he user will be alerted to input a correct value.

Future Work: Deleting/ removing tasks which have the status of "completed" rather than crossing them out with a line.

## Project Management

PM: Joshua Devine

Was responsible for implementing branching conventions for the team where we had a main branch which was meant to be our most stable/ production version of our system. Another branch which was meant to be a test/ working vesion of the main branch was used as a testing ground for when all the our individual work was merged together and tested to see if it interfaced/ functioned together. Individual branches were branched from working for individual developments in the notation of {name}_{type of branch}_{Specifications of the work being done}, more details regarding branching can be found in the wiki on group 93s repo, I created this to help the team understand the convention for branching. Finally, I was mainly responsible for merging all the branches together into working and main, this meant that conflicts in code occasionally had to be resolved.

Future Work: The implementation of a Scrum board and issues would be helpful for having more traceability of who is responsible for what and esnure more efficient development process.

## Core CSS & Layout (comp2110-portal, blog-block & widget-column)

<h2>Developer: Antonio Panebianco</h2>

Configured the core layout of the website, where each element of the entire website was to be placed. Designed the layout of the header, the list of blog posts and ensured everyone's widget's layouts were uniform and consistent with the design, look and feel of the rest of the page. Was responsible for all of the main CSS of the website, along with aesthetic choices, such as colours, fonts, button designs, widget order, column layout, and grid design. Ensured everything met these design requirements, which involved constant modifications of the page's CSS, trialling different solutions through sketches and storyboard applications such as Adobe XD, modifying widgets to meet design compliance, and debugging CSS issues, such as grid layout problems, widget and header spacing problems.

The website should appear very clean and relatively minimalistic, showcasing core information quickly and easily. It allows the user to quickly login in the header, and view the rest of the page and feel inspired and encouraged to continue interacting with it. This was further made possible with the help of animations and transitions that we created and shared as a team.

Future work: Creating more animations and transitions to create a fully fluid and dynamic design, and improve the cleanliness and minimalism of the overall design. The current website is compatible with 1920x1080 and 2560x1440 displays, however lacks support for any other resolution. Future work would also include making the website function on not only mobile screens but all screen sizes and shapes.

## Public Holiday Widget (holiday-widget)

<h2>Developer: Antonio Panebianco</h2>

Designed and created the public holiday widget in its entirety. The public holiday widget requires 3 API's in order to function properly and effectively:

https://date.nager.at/api/v3/publicholidays

This API is what provides us with the actual list of holidays and their details for a set country.

https://api.country.is/

This API gets the user's country in the form of a Country Code which the public holiday API can understand.

https://date.nager.at/api/v3/AvailableCountries

This API gets us a list of all countries the public holiday API supports, so we can populate a dropdown menu with them for the user to pick a country different to their current geographic location.

Using these three API's, the public holiday widget is able to grab the user's location and display the public holidays for that user's location immediately upon load.

<h3>NOTE:</h3>

    If for some reason it is unable to get a user's country, it should default to Australia, and the same goes for if it is unable to find the year, it should default to 2023.

The user will be able to view the upcoming public holidays that are yet to pass, in a clean, minimalistic and aesthetic fashion.
From here, the user can use the drop down menu to pick another country and see the public holidays for them, and it will populate the new public holidays in the widget immediately upon selection. The amount of public holidays visible has been limited to 4 for cleanliness and functionality to prevent overwhelming the data with distant and likely irrelevant dates. If there are less than 4 dates, it will only print those left that are remaining for the year. It will not print any public holidays of the next year, and if the holiday is too long, it will be cut off with ellipsis for the sake of aesthetics.

Future Work:
Make it possible for the user to select a year, so that they may see public holidays of previous and future years, and make it possible for a user to go back in the year and see earlier public holidays. Add functionality so that the user can click on a public holiday and see the full name, along with any other information about it.

## Currency Converter Widget

Devloper: Jason Devine

Was resposible for creating a currency conversion widget that when upon value input. The overall design of the widget went through many iterations ranging from at first on click conversion using a button to finally live conversion using the @keyup event on the input so that the value was constantly up to date. Various checkers were implemented to catch user errors such as same currency codes, empy value, and invalid input. Two apis were used in the creation of the widget one to fetch the rates and the other to perfrom the conversion. The first API was used to populate the options the dropped down from the select, the second API would take the values inputed in the selects and the input and return the converted value for the selected rates. Overall the final iteration was the most functional version being able to update the value consistently with each keyup with no errors.

Future work: I would have liked to implement a second conversion that required no input so that when the user switched currencies not only would it the input for the amount to be entered but it would also have second display of what a 1 to 1 conversion looked like for the two currencies.

## Dad joke widget

Devloper: Jason Devine

Was responsible for implementing a bonus random dad joke widget. While this widget was not specified in the specifications we were however informed that we could fill the space with what we like. With that information I implemented this widget that called the api which required that the output be set to json inorder for the response from the fetch to be json. The joke was then assigned to a variable so that on button click the joke function was called and the joke would be rendered.

Future Work:Perhaps remove the button and have the joke change on hover or mouse over.

## 'Fact About the Current Date' Widget

Developer: Dylan Neilson

I was responisble for developing a fact widget using the Numbers Api. This api allowed me to display a fact about the current date within the widget. This was done by creating a request to the API through JavaScript. The implementation was straightforward, creating variables to store the current day and month, and then using those variables to the construct the request URL. CSS was then used to give the widget some interactivity and movement, which created the end result where the user is promted to hover over the 'pulsing' circle to reveal a fact about the current date.

Future Work: Changing the design of the widget so that when the user clicks on the widget's circle, the widget tile plays an animation that shows the tile flipping on it's back to reveal the fact.
