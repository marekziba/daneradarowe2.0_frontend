import { Exclude, Expose, Transform, Type } from "class-transformer";
import { BoundingBox } from "./BoundingBox.model";
import { Location } from "./Location.model";

export class Image {
    @Expose()
    url: string;

    @Expose()
    @Type(() => Date)
    date: Date

    @Expose()
    maskUrl: string;
}