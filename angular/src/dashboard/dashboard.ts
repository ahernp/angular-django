export class SettingsFlag {
    name: string;
    expected: boolean;
    actual: boolean;
}

export class LogEntry {
    level: string;
    msg: string;
    datetime: string;
}
export class Dashboard {
    timeChecked: string;
    hostname: string;
    gitVersion: number;
    pythonPackages: string;
    settingsFlags: SettingsFlag[];
    logEntries: LogEntry[];
}
