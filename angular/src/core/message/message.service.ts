import {Injectable} from '@angular/core';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {Message} from './message';

@Injectable()
export class MessageService {
    messageCache: Message[] = [];
    messages$: ReplaySubject<any> = new ReplaySubject(1);

    constructor() {
        this.messages$.next([]);
    }

    getMessages(): ReplaySubject<any> {
        return this.messages$;
    }

    addMessage(newMessage: Message): void {
        this.messageCache.push(newMessage);
        this.messages$.next(this.messageCache);
    }

    clearMessages(): void {
        this.messageCache = [];
        this.messages$.next(this.messageCache);
    }

    clearMessagesBySource(source: string): void {
        this.messageCache = this.messageCache.filter(message => message.source != source);
        this.messages$.next(this.messageCache);
    }
}
