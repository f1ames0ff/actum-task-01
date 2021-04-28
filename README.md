# ACTUM task_01
## Task description
### goal:
An application that gives us the possibility to search users [params: username, location, programming language] through the service Github.

I can search for:

username
location
programming language
I can navigate through the results with pagination.

Handle input logic by yourself, it could be one input with the possibility to search through several options or many inputs.

### level two

The application should be done with a framework or library that is required for the position (REACT), 
styling depends on a developer, feel free to use what you want. The code should be covered with tests.

### BONUS

Implement autocomplete using bouncing or throttling and be ready to describe your choice.

## Developer notes

Test app was created with `npx create-react-app` utility.
Next steps assuming you have already installed dependencies with `yarn`.

### Starting app
To run the app execute `yarn start` it will run a local dev server and open a new browser tab.

### Unit tests
To run unit tests execute `yarn test`. Test are using integrated Jest platform.

### Ent-to-End tests
To run end-to-end follow next instructions:
* run `yarn run start`
* wait for the app window to load
* run `yarn cypress:open`
* 
