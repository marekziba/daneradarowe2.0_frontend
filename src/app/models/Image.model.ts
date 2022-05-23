import { Exclude, Expose, Transform } from "class-transformer";
import { BoundingBox } from "./BoundingBox.model";
import { Location } from "./Location.model";

export class Image {
    
    @Expose()
    date: string;
    elev: string;
    @Expose()
    url: string;

    @Expose()
    lat_ul: number;
    @Expose()
    lon_ul: number;
    @Expose()
    lat_lr: number;
    @Expose()
    lon_lr: number;

    // @Expose()
    // @Transform((image: any) => new BoundingBox(new Location(image.lat_ul, image.lon_ul), new Location(image.lat_lr, image.lon_lr)))
    // boundingBox: BoundingBox;

    boundingBox(): BoundingBox {
        return new BoundingBox(new Location(this.lat_ul, this.lon_ul), new Location(this.lat_lr, this.lon_lr));
    }
}