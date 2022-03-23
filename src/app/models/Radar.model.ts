import { Location } from "./Location.model";

export class Radar {
    constructor(
        private _fullName: string,
        private _codeName: string,
        private _location: Location,
        private _boundingBox: Location[]
    ) {}

    public get fullName(): string {
        return this.fullName;
    }

    public get codeName(): string {
        return this._codeName;
    }

    public get location(): Location {
        return this._location;
    }

    public get boundingBox(): Location[] {
        return this._boundingBox;
    }

    public flatBoundingBox(): number[] {
        return [
            ...this._boundingBox[0].getLonLat(),
            ...this._boundingBox[1].getLonLat()
        ]
    }
}