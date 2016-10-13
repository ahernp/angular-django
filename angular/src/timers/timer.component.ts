import {Component, Input, OnInit} from '@angular/core';

import {leadingZero} from "../app.settings";

const second: number = 1000;
const minute: number = second * 60;
const hour: number = minute * 60
const day: number = hour * 24;
const week: number = day * 7;

@Component({
    selector: 'ad-timer',
    template: `{{timeDiff}}`
})
export class TimerComponent implements OnInit {
    @Input() targetTimeString: string;

    targetTime: Date;
    timeDiff: string;

    calcTimeDifference(): void {
        var timeDiff: string = '';
        var now: Date = new Date();

        var fromTime: Date = (now < this.targetTime) ? now : this.targetTime;
        var toTime:Date = (now > this.targetTime) ? now : this.targetTime;

        var fromYear: number = fromTime.getUTCFullYear();
        var toYear: number = toTime.getUTCFullYear();
        var yearDiff= toYear - fromYear;

        var fromMonth: number = fromTime.getUTCMonth();
        var toMonth: number = toTime.getUTCMonth();

        var fromMonthDay: number = fromTime.getUTCDate();
        var toMonthDay: number = toTime.getUTCDate();

        var fromHour: number = fromTime.getUTCHours();
        var toHour: number = toTime.getUTCHours();

        var fromMinute: number = fromTime.getUTCMinutes();
        var toMinute: number = toTime.getUTCMinutes();

        var fromSecond: number = fromTime.getUTCSeconds();
        var toSecond: number = toTime.getUTCSeconds();

        if (fromMonth > toMonth ||
            (fromMonth == toMonth && fromMonthDay > toMonthDay) ||
            (fromMonth == toMonth && fromMonthDay == toMonthDay && fromHour > toHour) ||
            (fromMonth == toMonth && fromMonthDay == toMonthDay && fromHour == toHour && fromMinute > toMinute) ||
            (fromMonth == toMonth && fromMonthDay == toMonthDay && fromHour == toHour && fromMinute == toMinute && fromSecond > toSecond)) {
            var monthDiff: number = 11 + toMonth - fromMonth;
            yearDiff -= 1;
        }
        else
            var monthDiff: number = toMonth - fromMonth;

        if (fromMonthDay > toMonthDay ||
            (fromMonthDay == toMonthDay && fromHour > toHour) ||
            (fromMonthDay == toMonthDay && fromHour == toHour && fromMinute > toMinute) ||
            (fromMonthDay == toMonthDay && fromHour == toHour && fromMinute == toMinute && fromSecond > toSecond))
            monthDiff -= 1;


        var fromTimeWithinOneMonth: Date = new Date(`${fromYear+yearDiff}-${leadingZero(fromMonth+monthDiff+1)}-${leadingZero(fromMonthDay)}T${leadingZero(fromHour)}:${leadingZero(fromMinute)}:${leadingZero(fromSecond)}Z`);
        var difference: number = toTime.valueOf() - fromTimeWithinOneMonth.valueOf();

        var weekDiff: number = Math.floor(difference / week);
        difference = difference % week;

        var dayDiff: number = Math.floor(difference / day);
        difference = difference % day;

        var hourDiff: number = Math.floor(difference / hour);
        difference = difference % hour;

        var minuteDiff: number = Math.floor(difference / minute);
        difference = difference % minute;

        var secondDiff: number = Math.floor(difference / second);

        var addDiffString = (difference: number, label): string => {
            var timeDiff: string = '';
            if (difference > 0) {
                timeDiff = ', ' + difference + ' ' + label;
                if (difference > 1)
                    timeDiff += 's';
            }
            return timeDiff
        }

        var timeDiff: string = '';

        timeDiff += addDiffString(yearDiff, 'year');
        timeDiff += addDiffString(monthDiff, 'month');
        timeDiff += addDiffString(weekDiff, 'week');
        timeDiff += addDiffString(dayDiff, 'day');
        timeDiff += addDiffString(hourDiff, 'hour');
        timeDiff += addDiffString(minuteDiff, 'minute');
        timeDiff += addDiffString(secondDiff, 'second');

        this.timeDiff = timeDiff.substring(2);

    }

    ngOnInit(): void {
        this.targetTime = new Date(this.targetTimeString);
        setInterval(() => this.calcTimeDifference(), 1000);
    }
}
