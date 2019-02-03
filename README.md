# SocketApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `npm run start:server` for a api. 

## What it does

At startup, the Client will established a websocket connection to the api under `localhost:4001/api/mysocket`. The Angular app uses
`localhost:4200/api/mysocket` by its local proxy settings.

To test the application, open it in a different browser or via local ip in a diffrent divice in your current network. Then type in
a message. This message should be instant visible in on all clients. To change a room, enter a new room name at the fist input
field and hit enter. Then type in a message. Only clients that are also participant of this room, will get the messages.

Same works with the reload button. It will reload all other clients and not the sender.
