import {Component, Input, OnInit} from '@angular/core';

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
        var toTime: Date = (now > this.targetTime) ? now : this.targetTime;

        var fromYear: number = fromTime.getUTCFullYear();
        var toYear: number = toTime.getUTCFullYear();
        var yearDiff = toYear - fromYear;

        var fromMonth: number = fromTime.getUTCMonth() + 1;
        var toMonth: number = toTime.getUTCMonth() + 1;

        var fromMonthDay: number = fromTime.getUTCDate();
        var toMonthDay: number = toTime.getUTCDate();

        var fromHour: number = fromTime.getUTCHours();
        var toHour: number = toTime.getUTCHours();

        var fromMinute: number = fromTime.getUTCMinutes();
        var toMinute: number = toTime.getUTCMinutes();

        var fromSecond: number = fromTime.getUTCSeconds();
        var toSecond: number = toTime.getUTCSeconds();

        var fromTimeLaterInYear: boolean = (fromMonth > toMonth ||
            (fromMonth == toMonth && fromMonthDay > toMonthDay) ||
            (fromMonth == toMonth && fromMonthDay == toMonthDay && fromHour > toHour) ||
            (fromMonth == toMonth && fromMonthDay == toMonthDay && fromHour == toHour && fromMinute > toMinute) ||
            (fromMonth == toMonth && fromMonthDay == toMonthDay && fromHour == toHour && fromMinute == toMinute && fromSecond > toSecond));

        if (fromTimeLaterInYear) {
            var monthDiff: number = 12 + toMonth - fromMonth;
            yearDiff -= 1;
        }
        else
            var monthDiff: number = toMonth - fromMonth;

        var fromTimeLaterInMonth: boolean = (fromMonthDay > toMonthDay ||
            (fromMonthDay == toMonthDay && fromHour > toHour) ||
            (fromMonthDay == toMonthDay && fromHour == toHour && fromMinute > toMinute) ||
            (fromMonthDay == toMonthDay && fromHour == toHour && fromMinute == toMinute && fromSecond > toSecond));

        if (fromTimeLaterInMonth)
            monthDiff -= 1;

        var fromYearWithinOneMonth = (fromTimeLaterInMonth && toMonth == 1) ? toYear - 1 : toYear;
        var fromMonthWithinOneMonth = (fromMonth + monthDiff) % 12;
        var daysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();
        var fromMonthWithinOneMonthEnd: number = daysInMonth(
            fromYearWithinOneMonth,
            (fromMonthWithinOneMonth == 12) ? 1 : fromMonthWithinOneMonth);
        if (fromMonthDay > fromMonthWithinOneMonthEnd)
            fromMonthDay = fromMonthWithinOneMonthEnd;

        var fromTimeWithinOneMonth: Date = new Date(Date.UTC(
            fromYearWithinOneMonth,
            fromMonthWithinOneMonth - 1,
            fromMonthDay,
            fromHour,
            fromMinute,
            fromSecond));

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

        var addDiffString = (difference: number, label: string): string => {
            var timeDiff: string = '';
            if (difference > 0) {
                timeDiff = ', ' + difference + ' ' + label;
                if (difference > 1)
                    timeDiff += 's';
            }
            return timeDiff
        };

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
