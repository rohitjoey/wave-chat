# CloudWave Full Stack Code Challenge ~ Wave Chat

## Front-end
### UI & Components
We've added `ant design` for you to use, which comes with a selection of UI React components and style classes out of the box.

Read more [here](https://ant.design/).

&nbsp;
### Talking To Socket IO
We've configured socket.io for you. To connect the client to the backend, you can use the code snippet below.

Read more [here](https://socket.io/).

```js
const socket = io(
  config.SOCKET_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);
```

&nbsp;
## Back-end