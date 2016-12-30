import {Injectable} from '@angular/core';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {Message} from './message';

export const messageTypeError: string = 'error';
export const messageTypeInfo: string = 'info';

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

    addErrorMessage(source: string, text: string): void {
        this.messageCache.push(<Message>{type: messageTypeError, source: source, text: text});
        this.messages$.next(this.messageCache);
    }

    addInfoMessage(source: string, text: string): void {
        this.messageCache.push(<Message>{type: messageTypeInfo, source: source, text: text});
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
