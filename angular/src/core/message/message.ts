export const messageTypeError: string = 'error';
export const messageTypeInfo: string = 'info';

export class Message {
    type: string;
    source: string;
    text: string;
}
