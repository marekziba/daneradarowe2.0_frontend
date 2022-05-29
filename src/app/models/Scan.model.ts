import { Expose } from "class-transformer";

export class Scan {
    @Expose()
    type: string;

    @Expose()
    range: number;

    @Expose()
    numele: number;
}