# CloudWave Full Stack Code Challenge ~ Wave Chat
CloudWave have provided scaffolding for both the front and back end of the challenge, to save you time.

## Front-end
### Configuration
This application uses typescript and jest/react-testing-library. `tsconfig.json` has been pre-configured for the environment.

### UI & Components
We've added `ant design` for you to use, which comes with a selection of UI React components and style classes out of the box.

Read more [here](https://ant.design/).

### Routing
This challenge uses `react-router-dom` for routing.


### Socket IO
To connect the client to the backend, you can use the code snippet below.

Read more [here](https://socket.io/).

```js
const socket = io(
  config.SOCKET_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);
```

&nbsp;
## Back-end

### Configuration
This application uses typescript and jest. `tsconfig.json` has been pre-configured for the environment.

### Socket IO
The HTTP server with socket.io are already connected. The socket server will automatically run by default on port 3001.

### Hot Reload
The backend server supports hot reload using `nodemon`. Any changes you make to files will automatically be updated if the server is started with the `start:dev` command.