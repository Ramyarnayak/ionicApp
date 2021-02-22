import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject: Subject<any> = new Subject<any>();

  constructor() { }

  clearMessages(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(message: string): void {
    this.subject.next({ text: message });
  }

  sendMessageWithValue(message: string, val: any): void {
    this.subject.next({ text: message, value: val });
  }

}
