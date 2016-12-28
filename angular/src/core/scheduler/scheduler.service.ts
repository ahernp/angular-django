import {Injectable} from '@angular/core';

const microsecondsPerMinute: number = 1000 * 60;
const microsecondsPerHour: number = microsecondsPerMinute * 60;

@Injectable()
export class SchedulerService {
    hourly(minuteOfHour: number, func: any): void {
        let now: Date = new Date();
        let currentMinute: number = now.getUTCMinutes();
        let initialTimeout = (currentMinute >= minuteOfHour) ?
            ((60 - (currentMinute - minuteOfHour)) * microsecondsPerMinute) :
            ((minuteOfHour - currentMinute) * microsecondsPerMinute)

        setTimeout(() => {
            func();
            setInterval(() => func(), microsecondsPerHour)
        }, initialTimeout);
    }
}
