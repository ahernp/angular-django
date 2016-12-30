import {Component, OnInit} from '@angular/core';

import {Message} from "./message";
import {MessageService} from "./message.service";

@Component({
    selector: 'ad-message',
    template: `
        <div style="padding-left: 10px; padding-right: 10px;">
            <span *ngIf="messages.length > 0" class="ad-control" (click)="clearMessages()"
            style="position: absolute; top: -5px; right: 0px;" title="Clear messages">
                &times;
            </span>
            <p *ngFor="let message of messages" [class.highlight]="message.type == 'error'">{{message.text}}</p>
        </div>
    `,
    styles: [`
        p {
            text-align: right;
            margin-top: 5px;
            margin-bottom: 5px;
            padding-left: 5px;
            padding-right: 5px;
        }
    `]
})
export class MessageComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.messageService.getMessages().subscribe(messages => this.messages = messages);
    }

    clearMessages(): void {
        this.messageService.clearMessages()
    }
}
