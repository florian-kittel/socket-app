export interface User {
  name: string;
}

export interface Message {
  from: User;
  content: string;
  room?: string;
  action?: string;
}

export interface ChatMessage extends Message {
  from: User;
  content: string;
  action: any;
}

// Actions you can take on the App
export enum Action {
  JOINED,
  LEFT,
  RENAME
}

// Socket.io events
export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}
