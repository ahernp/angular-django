import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimerComponent} from './timer.component';

describe('Component: TimerComponent; Function calcTimeDifference', () => {
    let component: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TimerComponent],
        });
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
    });

    it("returns a string showing time difference", function() {
        var fromDate = new Date('1969-12-05T14:00:00Z');
        var toDate = new Date('1969-12-06T14:00:00Z');
        expect(component.calcTimeDifference(fromDate, toDate)).toBe('1 day');
    });
});
