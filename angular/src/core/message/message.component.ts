import {Component, OnInit} from '@angular/core';

import {Message} from "./message";
import {MessageService} from "./message.service";

@Component({
    selector: 'ad-message',
    template: `
        <p *ngFor="let message of messages" [class.highlight]="message.type == 'ERROR'">{{message.text}}</p>
    `,
    styles: [`
        p {
            text-align: right;
        }
    `]
})
export class MessageComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.messageService.getMessages().subscribe(messages => this.messages = messages);
    }
}
