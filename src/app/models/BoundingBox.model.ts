import { Location } from "./Location.model";

export class BoundingBox {
    constructor(private p1: Location, private p2: Location, private mode: string = 'latlon'){
        
    }

    static fromArray(array: number[][], mode: string = 'latlon'){
        return new BoundingBox(
            Location.fromArray(array[0], mode),
            Location.fromArray(array[1], mode),
            mode
        );
    }

    public flat(mode: string = 'latlon'): number[] {
        console.log(mode);
        if(mode === 'latlon'){
            return [
                ...this.p1.getLatLon(),
                ...this.p2.getLatLon()
            ]
        }
        else if(mode === 'lonlat'){
            return [
                ...this.p1.getLonLat(),
                ...this.p2.getLonLat()
            ]
        }
        else {
            throw new Error(`Invalid mode: ${mode}`);
        }
    }
}