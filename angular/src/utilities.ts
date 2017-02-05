export function findStringContext(searchString: string, content: string): string {
    let searchStringLower = searchString.toLocaleLowerCase();
    let matchPosition = content.toLocaleLowerCase().indexOf(searchStringLower);

    if (matchPosition == -1)
        return '';

    let lineStartPosition = content.substr(0, matchPosition).lastIndexOf('\n');
    if (lineStartPosition == -1)
        lineStartPosition = 0;
    let lineEndPosition = content.substr(matchPosition, content.length).indexOf('\n');
    if (lineEndPosition == -1)
        lineEndPosition = content.length;
    else
        lineEndPosition = lineEndPosition + matchPosition;

    let matchContext = content.slice(lineStartPosition, lineEndPosition).trim();

    matchPosition = matchContext.toLocaleLowerCase().indexOf(searchStringLower);
    return matchContext.substr(0, matchPosition) +
        '<span class="highlight">' +
        matchContext.substr(matchPosition, searchString.length) +
        '</span>' +
        matchContext.substr(matchPosition + searchString.length, matchContext.length);
}

let leadingZero = (amount: number): string => amount < 10 ? `0${amount}` : `${amount}`;

export function toDateTimeString(date: Date): string {
    return '' +
        date.getFullYear() + '-' +
        leadingZero(date.getUTCMonth()+1) + '-' +
        leadingZero(date.getUTCDate()) + ' ' +
        leadingZero(date.getUTCHours()) + ':' +
        leadingZero(date.getUTCMinutes()) + ':' +
        leadingZero(date.getUTCSeconds());
}
