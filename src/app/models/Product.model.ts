import { Expose } from "class-transformer";
import { Image } from "./Image.model";
import { Scan } from "./Scan.model";

export class Product {
    id: string;
    @Expose()
    name: string;

    @Expose()
    productType: string;

    @Expose()
    elevationAngle?: number;

    @Expose()
    minHeight?: number;

    @Expose()
    maxHeight?: number;

    @Expose()
    height?: number;

    @Expose()
    startRange?: number;

    @Expose()
    stopRange?: number;

    @Expose()
    reflectivityThreshold?: number;

    @Expose()
    range: number;
    
    scan: Scan;
}