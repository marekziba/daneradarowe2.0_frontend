import { Expose, Transform } from "class-transformer";
import { BoundingBox } from "./BoundingBox.model";
import { Location } from "./Location.model";

export class ProductVariant {
    @Expose()
    propertyName: string;

    @Expose()
    propertyValue: string;

    @Expose()
    propertyUnit: string;

    @Expose({ toClassOnly: true })
    @Transform((_) => new BoundingBox(new Location(_.obj.lat_ul, _.obj.lon_ul), new Location(_.obj.lat_lr, _.obj.lon_lr)))
    boundingBox: BoundingBox;

    public static compare(pv1: ProductVariant, pv2: ProductVariant){
        if(pv1.propertyValue > pv2.propertyValue){
            return 1;
        } else if(pv1.propertyValue < pv2.propertyValue){
            return -1;
        } else{
            return 0;
        }
    }
}