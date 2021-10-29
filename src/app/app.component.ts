import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

import { Action } from './models';
import { Event } from './models';
import { Message } from './models';
import { User } from './models';


import { DomSanitizer } from '@angular/platform-browser';

import Identicon from 'identicon.js';
// let Identicon: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socket-app';
  action = Action;
  user: User;
  room = 'default';
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  id = '';

  avatars = {};

  ngOnInit(): void {
    this.initIoConnection();
  }

  constructor(private socketService: SocketService, private sanitizer: DomSanitizer) { }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        if (message && message.content) {
          this.messages.push(message);
        }
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
        this.id = this.socketService.id;
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: any): void {
    let message: any;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      };
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }

  public switchRoom(name) {
    this.socketService.switchRoom(name);
  }

  public onReload() {
    this.socketService.emitReload();
  }

  getAvatar(data: string) {
    if (!data) {
      return '';
    }

    if (!this.avatars[data]) {
      const options = {
        foreground: [255, 255, 255, 255],
        background: [0, 0, 0, 255],
        margin: 0.2,
        size: 24,
        format: 'png'
      };

      const format = 'png';
      const svg = new Identicon(data + (Date.now()), options).toString();
      this.avatars[data] = `data:image/${format};base64,${svg}`;
    }

    return this.sanitizer.bypassSecurityTrustUrl(this.avatars[data]);
  }

}
