export function leadingZero(amount: number): string {
    return amount < 10 ? `0${amount}` : `${amount}`;
}

export function toDateTimeString(date: Date): string {
    return '' +
        date.getFullYear() + '-' +
        leadingZero(date.getUTCMonth()) + '-' +
        leadingZero(date.getUTCDate()) + ' ' +
        leadingZero(date.getUTCHours()) + ':' +
        leadingZero(date.getUTCMinutes()) + ':' +
        leadingZero(date.getUTCSeconds())
}
