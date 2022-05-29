import { Expose } from "class-transformer";

export class DataType {
    id: number;

    @Expose()
    name: string;

    @Expose()
    scaleUrl: string;

    @Expose()
    valueMin: number;

    @Expose()
    valueMax: number;
}