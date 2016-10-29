export class SettingsFlag {
    name: string;
    expected: boolean;
    actual: boolean;
}

export class Dashboard {
    timeChecked: string;
    hostname: string;
    gitversion: number;
    python_packages: string;
    settings_flags: SettingsFlag[];
}
