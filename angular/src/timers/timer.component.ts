import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ad-timer',
    template: `{{timeDiff}}`
})
export class TimerComponent implements OnInit {
    @Input() targetTimeString: string;

    targetTime: Date;
    timeDiff: string;

    calcTimeDifference(): void {
        var timeDiff = '';
        var now = new Date();

        var fromTime = (now < this.targetTime) ? now : this.targetTime;
        var toTime = (now > this.targetTime) ? now : this.targetTime;

        var fromYear: number = fromTime.getUTCFullYear();
        var toYear: number = toTime.getUTCFullYear();
        var yearDiff= toYear - fromYear;

        var fromMonth: number = fromTime.getUTCMonth();
        var toMonth: number = toTime.getUTCMonth();

        var fromMonthDay: number = fromTime.getUTCDate();
        var toMonthDay: number = toTime.getUTCDate();

        var fromMonthDay: number = fromTime.getUTCDate();
        var toMonthDay: number = toTime.getUTCDate();

        var fromHour: number = fromTime.getUTCHours();
        var toHour: number = toTime.getUTCHours();

        var fromMinute: number = fromTime.getUTCMinutes();
        var toMinute: number = toTime.getUTCMinutes();

        var fromSecond: number = fromTime.getUTCSeconds();
        var toSecond: number = toTime.getUTCSeconds();

        if (fromMonth > toMonth ||
            (fromMonth == toMonth && fromMonthDay > fromMonthDay) ||
            (fromMonth == toMonth && fromMonthDay == fromMonthDay && fromHour > toHour) ||
            (fromMonth == toMonth && fromMonthDay == fromMonthDay && fromHour == toHour && fromMinute > toMinute) ||
            (fromMonth == toMonth && fromMonthDay == fromMonthDay && fromHour == toHour && fromMinute == toMinute && fromSecond > toSecond)) {
            var monthDiff = 12 + toMonth - fromMonth;
            yearDiff -= 1;
        }
        else
            monthDiff = toMonth - fromMonth;

        if (yearDiff > 0) {
            timeDiff = '' + yearDiff + ' year';
            if (yearDiff > 1)
                timeDiff += 's';
        }

        if (monthDiff > 0) {
            timeDiff += ' ';
            timeDiff += monthDiff + ' month';
            if (monthDiff > 1)
                timeDiff += 's';
        }

        this.timeDiff = timeDiff;

    }

    ngOnInit(): void {
        this.targetTime = new Date(this.targetTimeString);
        setInterval(() => this.calcTimeDifference(), 1000);
    }
}
