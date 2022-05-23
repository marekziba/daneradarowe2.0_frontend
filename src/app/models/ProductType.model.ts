import { Expose, Type } from "class-transformer";
import { Product } from "./Product.model";

export class ProductType {
    @Expose()
    name: string;

    @Expose()
    definingAttribute: string;

    @Expose()
    @Type(() => Product)
    products: Product[];
}