import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Message } from './models';
import { Event } from './models';

import * as socketIo from 'socket.io-client';

// Defined Server URL (localhost:4200)
const SERVER_URL = `${window.location.protocol}//${window.location.host}`;

@Injectable()
export class SocketService {
  private socket;

  public name: string;
  public room = 'default';
  public rooms = [];

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL, { path: '/api/mysocket' });
    this.switchRoom('default');
  }

  public send(message: Message): void {
    this.socket.emit('message', { room: this.room, ...message });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));

      this.socket.on('reload', () => {
        window.location.reload(true);
      });

    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public switchRoom(room) {
    this.room = room;
    this.socket.emit('room', room);
  }

  public emitReload() {
    this.socket.emit('reload', this.room);
  }
}
