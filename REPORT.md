# Project Experience Report - Group 93

</br>

### Written by Antonio Panebianco (46409742), Jason Devine (46450777), Joshua Devine (45238278) and Dylan Neilson (47004029)

</br>

## 1. Details of the deployment

The group’s website that has been constructed in this project has been set up and deployed to the internet using the freely available ‘Workers & Pages’ serverless deployment feature provided by the major IT service provider Cloudflare. The project is currently deployed and visible at this link:

https://comp2110-group93.pages.dev/

The group decided upon Cloudflare as it offers an easy, simple, and hassle-free way of hosting a site without any costs or additional work. This is because this particular Cloudflare service is serverless, meaning the group does not have to pay to rent a space on a server or for the group to build our own, as all of the back-end stack is managed by Cloudflare themselves through their own system that provides us with the service.

All that it required of us was for one of us to create a Cloudflare account, and then perform some basic ‘npm’ and ‘npx wrangler’ commands in the terminal to install the required files to communicate with Cloudflare. From there, we could use wrangler to create and publish our deployment to Cloudflare using the instructions provided.

There was one problem that occurred as a result of our deployment, which caused a particular widget to break and lose all functionality. Upon initial deployment, the random fact of the day widget’s API broke and as a result, the widget is stuck in an infinite ‘loading’ state on the website. This problem occurred as the API used to get the fact was insecure, using only HTTP and not HTTPS when the site the group has deployed is using HTTPS. Since HTTPS is secure, it automatically blocks communications to any other non-encrypted HTTP connections and sites, which results in the API breaking. A fix for this issue has not been pushed through to the deployment branch, as it would require a complete rewrite of the code with a new API, or a proxy workaround. However, apart from this, all of the other aspects of the deployment process were successful, and every other aspect of the website is working as intended.

</br>

## 2. What has the group implemented?

This project satisfied all the requirements specified by the project description with an overall positive team reception to the final product. Each project member contributed a widget of their choice, which conformed to a cohesive design scheme agreed upon by each team member. The widgets each member was responsible for were:

Joshua Devine – Weather Widget, Todo-Task Widget

- Weather Widget – displays temperature, time, and relative location data, and the weather icon varies depending on warmer or colder temperatures.

- Todo-Task Widget – displays user's tasks to do, allows adding of new tasks, updates the tasks status to 'completed', tasks are crossed out to indicate 'completed' status change.

Jason Devine – Currency Conversion Widget, Random Dad Joke Widget

- Currency Conversion Widget – converts the chosen inputted currency to selected outputted currency, does not allow blank inputs.

- Random Dad Joke Widget – displays a random joke when the button is pressed.

Antonio Panebianco – Public Holidays Widget

- Public Holidays Widget – displays public holiday information about the selected country.

Dylan Neilson – Random Fact Widget

- Random Fact Widget – displays random fact information on the given day.

Blogpost functionality was also added per what was expected in the project specifications. A user had to log in to access this core functionality required by the project. Login functionality was extended by additionally checking for an incorrect login attempt, which was implemented by checking the server's response for any error fields. The default implementation just allowed the user to log in regardless of if their details were correct or not and even if the server sent an error response rather than a user token. This was not ideal functionality as it did not simulate a natural reaction or handling of the situation and allowed the user to access features of the application exclusive to existing users. The user is now alerted to an incorrect login attempt and must log in correctly again. This correct login allows the user to access the blog post feature and post blogs by using the user token grabbed from the server login response to authorise the post is from a valid user. The functionality of blog posting was also extended to account for checking blank or invalid inputs. From a user's perspective, it did not make sense for the ability to post blank blogs as it did not provide any value to the website's purpose besides testing the application's ability to handle blank blogs. Thus, when an invalid blog post is detected, the user is prompted to enter valid inputs for a blog.

Extra widgets were also included, which exceeded the minimum viable product needed to satisfy the project constraints. These additional widgets were a to-do-task widget and a random dad joke widget. The functionality of the to-do-task widget was also extended by prompting the user to log in to access the feature and having clicked tasks crossed out to indicate the status had been changed to 'completed'. Since posting and getting tasks from the server required user authorisation using a valid user token, it made sense to restrict access to the widget until the user logged in. Additionally, the server at this stage lacked the ability to delete tasks that had been completed. Thus, a client-side workaround was implemented to cross out tasks with a 'completed' status to allow and show the user a task was done. The overall web page was styled to have a sleek, modern user interface consistent for each component. The style standard was agreed upon and incorporated into the design of each widget.

</br>

## 3. What was challenging for the group?

Completing this assignment as a group itself was the first challenge faced. For some of us, this was the first group project that involved programming a combined final product which in this case required each member of the group to code their respective module or in this case widget. This meant that communication within the group struggled at first specially to make sure that all members met deadlines and contributed equally. This was especially evident at first when it came to GitHub and branching off the correct branches. However, this was quickly remedied and allowed us to move forward as a group as well as allow us to learn future programming practices that we will eventually find ourselves using in the workplace.

The next hurdle that we as a group had to overcome was how each of our widget’s functionality worked with respect to each of our individual APIs. Each member had different logic involved when it came to producing the final product for their respective widget. This often resulted in collaborative discussions with the goal of problem-solving each issue methodologically. This obviously taught each of us valuable problem-solving skills and allowed us to adequately progress the project during the timeframe given to us. This problem was especially evident when the widgets were required to utilise 2 or more APIs and figure out how they function together to ensure that the final product performed the task required of it.

</br>

## 4. What was rewarding for the group?

During the development of this project, it gave us the opportunity to form a greater understanding of the topics taught in this unit by requiring us to use the learned content in a practical way. Starting with Part 1 of the project, which focused purely on CSS and UI/UX design, and Part 2, where we were then able to create a LIT component in JavaScript that communicated with an API.

Working with an API: Developing a widget for Part 2 of the task involved making requests to an API of our own choosing. As a group, we all chose a unique API to work with while designing our widgets. We found that the APIs chosen were not alike, and each one came with its own obstacles to overcome, which provided the opportunity to form a deeper understanding of working with APIs and handling data from external sources. Overall, we all gained experience working with real-world APIs that retrieved and integrated external data into each widget.

Creative Implementation and UI/UX: Continuing with the development of each of our widgets, we all used our understanding of CSS to enhance the designs by implementing an interactive aspect to the widgets. We all found this relatively rewarding as it gave us some creative freedom to find an interesting way to add some personalisation to create an engaging and visually appealing interface for each widget. This further gave us more insight into CSS animations, and added user interaction, which contributed to our understanding of creating effective web components that considered the user experience and the impact of visual elements on user engagement.

</br>

# 5. Individual reflections

## Antonio Panebianco - 46409742

### Public Holidays widget

The widget I chose for this project was the public holiday widget, which gets a list of public holidays from an API for a particular country and prints them out to remind the user of upcoming public holidays in their geographic location. Furthermore, it provides the user with the option of picking a different country from the dropdown menu and viewing their upcoming public holidays.

This widget seemed like an interesting choice personally as the core API has good documentation with supporting APIs. The core APIs had some useful documentation and example code to test out and explore how each feature and API worked, giving me insight into how I could use them in a quick and efficient manner. Furthermore, it seemed well thought out and highly developed, with compatibility with many different nations, while using a common country code identifier that would be compatible with other APIs. Thus, the widget had the potential to be paired with an additional external API to get the country code from the user’s location to provide the user with relevant public holidays immediately upon load. Thus, this seemed like an interesting widget choice due to the many different well-documented features and functions that I could use to develop the widget.

The most challenging part of this project was the dropdown menu for my public holiday widget. The dropdown menu for the public holiday widget had a few problems that took some time to solve. The first problem involved getting the dropdown to populate upon load. The API did not function as I initially thought and required some debugging using ‘console.log’ to understand what was going on and where things were going wrong during the population. More so, once I did find some mistakes, and had adjusted some of the logic, the dropdown population function was being called more than once thus populating the dropdown with the same countries a few times over. This took some time to solve, and even still it is a workaround and not an ideal solution, but it should not have any problems in the future.

The other major problem with the dropdown was the on-change handler, where when a user picked a country on the drop-down menu, it did not work the first time, however, the public holidays did end up updating when the user tried to change the country again. This was very unexpected and took many sessions to solve, as the logic seemed correct, and the function was being called successfully when the user used the drop-down the first time, it simply did not want to enter the next part of the function where the API is called for a reason still unknown to me. This, like the dropdown, was solved as I found a workaround solution by placing the function in another function that gets called once on load so that it is run once, so the first time a user uses the dropdown menu to change country, it is technically the second time the function is being called.

## Jason Devine - 46450777

### Currency Conversion widget

The widget that I chose to complete was the currency conversion widget. The currency conversion widgets functionality in its simplest form is that it can convert two different currencies from currency A to currency B. The reason I chose this widget is because compared to the other options it seemed the most interesting and practical to me. Upon further exploring the API’s documentation it solidified my interest in my choice. It also allowed me to map out the functionality that would be required by the widget as upon exploring the documentation the conclusion was quickly drawn that two API calls would be required, one to grab the rates and a following call to perform the conversion.

While creating the widget I encountered a number of challenges, the first being populating the select dropdowns options with the respective currency codes. The solution ended up being a simple fix by simply placing the code within the render() method rather than calling the same code through a function. Console.log was regularly required to debug the values being received from the API calls and it was especially useful when required to get the key from the first API call. The next challenge was centred around the final product, initially, I set out to create a currency converter that converted values on button press. However, as I reached this goal before the final due date, I thought that I could improve upon my final product as a button to me seemed to not fit in the aesthetic of the design. The change in theory was to simply remove the button and add an event handler to the input box. This did work at first going through different types of event handling as each subsequent type came with its own set of problems and errors e.g., change, keypress, keydown and keyup. The final version of the widget utilised keyup as it did what I wanted by calling the conversion function each time a key was released providing “live” conversion. This version also caused no problems or errors with my error handlers which display alerts if the criteria is met. The other event handlers were causing these problems as well, failing to update the value correctly and triggering alerts when not required.

## Joshua Devine - 45238278

### Weather Widget

I chose the Weather Widget and the Todo-Task Widget for this project to provide a robust user experience for the webpage with the most core functionality possible. My choice for the Weather Widget was influenced by the variety of weather widget designs found across the internet. Many of these were designs that incorporated static data to demonstrate the application's visual design. I was interested in integrating visual design aspects into a responsive widget that is updated with real-time data from an API. My selection for the Todo-Task Widget was inspired by my use of many todo-list/ todo-task applications/ widgets, which are extremely helpful for managing life commitments. I also knew that these types of applications/ widgets generally provide a useful feature that reflects positively on the user experience. Designing and building an application component that also achieved this functionality was a goal and desirable in helping my understanding of how these existing systems function.

The most challenging aspect of this project was incorporating branching conventions to manage the project and correctly using the geolocation API to grab a user's latitude and longitude coordinates. I figured that it would be good practice for the team to utilise the repository in a correct industry standard way to get a better understanding of how software projects are worked on in an industry setting by not just committing to the main branch even though our developed features were pretty independent of each other. Thus, I showed and encouraged the team to branch off the created working branch for any new features/developments, which was essentially a development version of main, used to test/ integrate all our features into a working build before merging to main. I highlighted that main is the most stable version of our system and provided a wiki with extra details to clarify the convention. Whilst, generally, this worked out fine, a few occasions required some intervention to help. Still, ultimately this helped develop our understanding of software project management and indicated how I could further improve my explanation of these concepts. Additionally, there were some minor starting issues with handling the promise for the geolocation API; however, after some quick research, the problem was quickly fixed.

## Dylan Neilson - 47004029

### ‘Fact About the Current Date’ Widget

I took on the task of developing the Fact About the Current Date widget for the project, which I feel allowed me to showcase some creativity while also completing the task at hand. The widget provides user interaction which makes it a bit more engaging while displaying the information to the users. The task also allowed me to explore GitHub and its features a bit more, as our group utilised branches to separate our individual work. It ended up being very organised and a reliable way of saving our progress.

The widget I created relied on the Numbers API to fetch and display interesting facts about the current date. While creating and implementing the widget, I gained hands-on experience in integrating external APIs into the website and handling data from external sources, allowing me to further my understanding of working with APIs and leveraging their capabilities to enhance the user experience.

To further enhance the widget's appeal, I put my CSS knowledge to use and added interactivity and movement to the design, incorporating an animated pulsing circle, prompting users to hover over it to reveal the fact. I think this creative implementation not only made the widget visually appealing but also demonstrated my ability to consider user engagement through visual elements. I do think I could also refine the widget's design by incorporating an animation that flips the tile to reveal the fact when the user clicks on the circle. I tried to implement this but did find it challenging, and thus I finalised on having the hover effect. I think getting the original idea for the design is where I actually struggled the most, as I did not have an overly hard time integrating the API. Regardless, I still think the interactive animation of the widget is suitable.

Overall, I was able to apply the taught content in a practical manner, while creating a widget that stands out and helped me gain a deeper understanding of API integration, data handling, and user engagement.
