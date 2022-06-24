import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../models/Product.model";
import { Radar } from "../models/Radar.model";
import { AppState, GeneralState, MapState, RadarImageState, RadarMetaState } from "./app.state";

export namespace AppSelectors {
    export const getRadarMeta = createFeatureSelector<RadarMetaState>('radarMeta');

    export const getRadarImages = createFeatureSelector<RadarImageState>('radarImage');

    export const getMap = createFeatureSelector<MapState>('map');

    export const getGeneral = createFeatureSelector<GeneralState>('general');

    export const getRadars = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => state.radars
    );

    export const getSelectedRadar = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => state.radars.find((radar: Radar) => radar.id === state.selectedRadarId)
    );

    export const getProducts = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => state.products
    );

    export const getSelectedProductVariant = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => {
            let product = state.products.find(product => product.variants.find(variant => variant.id === state.selectedProductVariantId));
            if(product){
                product.variants.filter(variant => variant.id === state.selectedProductVariantId)
                return product;
            } else return null;
        }
    );

    export const getColorScale = createSelector(
        getSelectedProductVariant,
        (product: Product) => product.dataType.scaleUrl
    );

    export const getCurrentImage = createSelector(
        getRadarImages,
        (imageState: RadarImageState) => imageState.images[imageState.selectedImageId]
    )

    export const getCurrentImageId = createSelector(
        getRadarImages,
        (state: RadarImageState) => state.selectedImageId
    )
}