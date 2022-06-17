import { ElementRef } from "@angular/core";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { BoundingBox } from "./BoundingBox.model";
import { Image } from "./Image.model";
import { Location } from "./Location.model";
import { Product } from "./Product.model";
import { ProductVariant } from "./ProductVariant.model";
import { Scan } from "./Scan.model";

export class Radar {
    id: number;

    @Expose()
    fullName: string;

    @Expose()
    codeName: string;

    @Expose()
    @Transform((_) => new Location(_.obj.lat, _.obj.lon))
    location: Location;

    @Expose()
    isComposite: boolean;

    @Expose({ groups: ['full'] })
    @Type(() => ProductVariant)
    productVariants: ProductVariant[]

    @Expose({ groups: ['full', 'with-products'] })
    @Type(() => Product)
    products: Product[]
    
    boundingBox(): BoundingBox {
        return undefined;
    }

    // location(): Location {
    //     return new Location(this.lat, this.lon)
    // }
}