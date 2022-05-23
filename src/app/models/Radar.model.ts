import { ElementRef } from "@angular/core";
import { Exclude } from "class-transformer";
import { BoundingBox } from "./BoundingBox.model";
import { Image } from "./Image.model";
import { Location } from "./Location.model";
import { Product } from "./Product.model";
import { Scan } from "./Scan.model";

export class Radar {
    id: string;
    fullName: string;
    codeName: string;
    lat: number;
    lon: number;
    isDoppler: boolean;
    isDP: boolean;
    images: Image[];
    compositeImages: Image[];
    scans: Scan[];
    products: Product[];
    
    boundingBox(): BoundingBox {
        return undefined;
    }

    location(): Location {
        return new Location(this.lat, this.lon)
    }
}