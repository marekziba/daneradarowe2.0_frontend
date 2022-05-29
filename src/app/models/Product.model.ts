import { Expose, Transform, Type } from "class-transformer";
import { DataType } from "./DataType.model";
import { Image } from "./Image.model";
import { ProductVariant } from "./ProductVariant.model";
import { Scan } from "./Scan.model";

export class Product {
    id: string;
    
    @Expose()
    productType: string;

    @Expose()
    codeName: string;

    @Expose()
    fullName: string;

    @Expose()
    @Type(() => DataType)
    dataType: DataType;

    @Expose()
    @Type(() => Scan)
    scan: Scan;

    @Expose()
    @Type(() => ProductVariant)
    variants: ProductVariant[];
}