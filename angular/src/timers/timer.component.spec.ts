import 'reflect-metadata';

import {calcTimeDifference} from './timer.component';

let testParams: any[] = [
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2009-12-06T14:00:00Z', difference: '1 day'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2009-12-12T14:00:00Z', difference: '1 week'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2010-01-05T14:00:00Z', difference: '1 month'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2010-12-05T13:59:59Z', difference: '11 months, 4 weeks, 1 day, 23 hours, 59 minutes, 59 seconds'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2010-12-05T14:00:00Z', difference: '1 year'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2009-12-13T15:01:01Z', difference: '1 week, 1 day, 1 hour, 1 minute, 1 second'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2009-12-21T16:02:02Z', difference: '2 weeks, 2 days, 2 hours, 2 minutes, 2 seconds'},
    {fromDate: '2009-12-05T14:00:00Z', toDate: '2010-12-05T13:00:00Z', difference: '11 months, 4 weeks, 1 day, 23 hours'},
    {fromDate: '2012-02-29T12:00:00Z', toDate: '2013-02-28T12:00:00Z', difference: '11 months, 4 weeks, 2 days'},
    {fromDate: '2012-02-29T12:00:00Z', toDate: '2013-03-01T12:00:00Z', difference: '1 year'},
    {fromDate: '2012-02-28T12:00:00Z', toDate: '2013-02-28T12:00:00Z', difference: '1 year'},
    {fromDate: '2012-09-30T12:00:00Z', toDate: '2012-10-31T12:00:00Z', difference: '1 month, 1 day'},
    {fromDate: '2012-10-31T12:00:00Z', toDate: '2012-11-30T12:00:00Z', difference: '4 weeks, 3 days'},
    {fromDate: '2012-11-28T12:00:00Z', toDate: '2012-12-28T12:00:00Z', difference: '1 month'},
];

for (let i = 0; i < testParams.length; i++) {
  (function (testSpec) {
    it(`time difference between ${testSpec.fromDate} and ${testSpec.toDate}`, function () {
        let fromDate = new Date(testSpec.fromDate);
        let toDate = new Date(testSpec.toDate);
        expect (calcTimeDifference(fromDate, toDate)).toBe(testSpec.difference);
    });
  })(testParams[i]);
};
