import { Expose, Transform } from "class-transformer";
import { Product } from "./Product.model";

export class ProductGroup {
    @Expose()
    name: string;

    @Expose()
    products: Product[]
}