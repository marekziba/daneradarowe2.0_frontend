import { ElementRef } from "@angular/core";
import { BoundingBox } from "./BoundingBox.model";
import { Location } from "./Location.model";

export class Radar {
    constructor(
        private _fullName: string,
        private _codeName: string,
        private _location: Location,
        private _boundingBox: BoundingBox,
        private _markerRef?: ElementRef
    ) {}

    public get fullName(): string {
        return this._fullName;
    }

    public get codeName(): string {
        return this._codeName;
    }

    public get location(): Location {
        return this._location;
    }

    public get boundingBox(): BoundingBox {
        return this._boundingBox;
    }

    public get markerRef(): ElementRef {
        return this._markerRef;
    }
}