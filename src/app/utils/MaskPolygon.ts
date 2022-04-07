import { Feature } from "ol";
import { Geometry, Polygon } from "ol/geom";
import { circular } from "ol/geom/Polygon";
import Source from "ol/source/Source";
import VectorSource from "ol/source/Vector";

export class MaskPolygon {
    private mask: Geometry;

    constructor(center: number[], radius: number, res: number = 720, dest_crs: string = 'EPSG:3857') {
        const polygon = new Polygon([[
            [-180.0, 90.0],
            [180.0, 90.0],
            [180.0, -90.0],
            [-180.0, -90.0]
        ]]);

        const circle: Polygon = circular(center, radius, res);

        polygon.appendLinearRing(circle.getLinearRing(0));

        this.mask = polygon.transform('EPSG:4326', dest_crs);
    }

    public translate(x: number, y: number) {
        this.mask.translate(x, y);
    }

    public getSource(): VectorSource {
        const feature = new Feature(this.mask);
        return new VectorSource({
            features: [feature]
        });
    }
}