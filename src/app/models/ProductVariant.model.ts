import { Expose } from "class-transformer";

export class ProductVariant {
    @Expose()
    propertyName: string;

    @Expose()
    propertyValue: string;

    @Expose()
    propertyUnit: string;

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