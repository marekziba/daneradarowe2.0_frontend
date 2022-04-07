export class Location {
    constructor(public latitude: number, public longitude: number) {};

    static fromArray(array: number[], mode: string = 'latlon'): Location {
        if(mode === 'latlon'){
            return new Location(array[0], array[1])
        }
        else if(mode === 'lonlat') {
            return new Location(array[1], array[0]);
        }
        else {
            throw new Error(`Invalid mode: ${mode}`);
        }
    }

    getLatLon(): number[] {
        return [this.latitude, this.longitude];
    }

    getLonLat(): number[] {
        return [this.longitude, this.latitude];
    }
}