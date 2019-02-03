# SocketApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7. This is a tech demo for angular with socket.io
in a NodeJs express server.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `npm run start:server` for a api. 

## What it does

At startup, the client will established a websocket connection to the api under `localhost:4001/api/mysocket`. The Angular app uses
`localhost:4200/api/mysocket` by it's local proxy settings.

To try out the application, open it twiche in different browsers or via local ip in a diffrent device in your current network. Then type in
a message in the second input filed and hit enter. This message should be instantaneously visible on all clients. To change a room, enter a 
new room name in the first input field and hit enter. Then type in a message. Only clients that are also participant of this room, will get 
the messages.

Same works with the reload button. It will reload all other clients and not the sender.
