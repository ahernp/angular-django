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

    getTimeDifference(): void {
        let timeDiff: string = '';
        let now: Date = new Date();

        let fromTime: Date = (now < this.targetTime) ? now : this.targetTime;
        let toTime: Date = (now > this.targetTime) ? now : this.targetTime;

        this.timeDiff = this.calcTimeDifference(fromTime, toTime);
    }

    ngOnInit(): void {
        this.targetTime = new Date(this.targetTimeString);
        this.getTimeDifference();
        setInterval(() => this.getTimeDifference(), 1000);
    }

    calcTimeDifference(fromTime: Date, toTime: Date): string {
        let fromYear: number = fromTime.getUTCFullYear();
        let toYear: number = toTime.getUTCFullYear();
        let yearDiff = toYear - fromYear;

        let fromMonth: number = fromTime.getUTCMonth() + 1;
        let toMonth: number = toTime.getUTCMonth() + 1;

        let fromMonthDay: number = fromTime.getUTCDate();
        let toMonthDay: number = toTime.getUTCDate();

        let fromHour: number = fromTime.getUTCHours();
        let toHour: number = toTime.getUTCHours();

        let fromMinute: number = fromTime.getUTCMinutes();
        let toMinute: number = toTime.getUTCMinutes();

        let fromSecond: number = fromTime.getUTCSeconds();
        let toSecond: number = toTime.getUTCSeconds();

        let fromTimeLaterInYear: boolean = (fromMonth > toMonth ||
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

        let fromTimeLaterInMonth: boolean = (fromMonthDay > toMonthDay ||
            (fromMonthDay == toMonthDay && fromHour > toHour) ||
            (fromMonthDay == toMonthDay && fromHour == toHour && fromMinute > toMinute) ||
            (fromMonthDay == toMonthDay && fromHour == toHour && fromMinute == toMinute && fromSecond > toSecond));

        if (fromTimeLaterInMonth)
            monthDiff -= 1;
        let fromYearWithinOneMonth = (fromTimeLaterInMonth && toMonth == 1) ? toYear - 1 : toYear;
        let fromMonthWithinOneMonth = (fromMonth + monthDiff - 1) % 12;
        let daysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();
        let fromMonthWithinOneMonthEnd: number = daysInMonth(
            fromYearWithinOneMonth,
            (fromMonthWithinOneMonth == 12) ? 1 : fromMonthWithinOneMonth);
        if (fromMonthDay > fromMonthWithinOneMonthEnd)
            fromMonthDay = fromMonthWithinOneMonthEnd;

        let fromTimeWithinOneMonth: Date = new Date(Date.UTC(
            fromYearWithinOneMonth,
            fromMonthWithinOneMonth,
            fromMonthDay,
            fromHour,
            fromMinute,
            fromSecond));

        let difference: number = toTime.valueOf() - fromTimeWithinOneMonth.valueOf();

        let weekDiff: number = Math.floor(difference / week);
        difference = difference % week;

        let dayDiff: number = Math.floor(difference / day);
        difference = difference % day;

        let hourDiff: number = Math.floor(difference / hour);
        difference = difference % hour;

        let minuteDiff: number = Math.floor(difference / minute);
        difference = difference % minute;

        let secondDiff: number = Math.floor(difference / second);

        let addDiffString = (difference: number, label: string): string => {
            let timeDiff: string = '';
            if (difference > 0) {
                timeDiff = ', ' + difference + ' ' + label;
                if (difference > 1)
                    timeDiff += 's';
            }
            return timeDiff
        };

        let timeDiff: string = '';

        timeDiff += addDiffString(yearDiff, 'year');
        timeDiff += addDiffString(monthDiff, 'month');
        timeDiff += addDiffString(weekDiff, 'week');
        timeDiff += addDiffString(dayDiff, 'day');
        timeDiff += addDiffString(hourDiff, 'hour');
        timeDiff += addDiffString(minuteDiff, 'minute');
        timeDiff += addDiffString(secondDiff, 'second');

        return timeDiff.substring(2);
    }
}
