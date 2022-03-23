export class Location {
    constructor(public latitude: number, public longitude: number) {};

    getLatLon(): number[] {
        return [this.latitude, this.longitude];
    }

    getLonLat(): number[] {
        return [this.longitude, this.latitude];
    }
}