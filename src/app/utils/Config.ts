export class Config {
    selectioModeEnabled: boolean = false;
    darkModeEnabled: boolean = false;

    static getSavedOrDefault(): Config {
        return new Config();
    }
}