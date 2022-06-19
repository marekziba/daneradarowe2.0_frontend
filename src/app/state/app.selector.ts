import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Radar } from "../models/Radar.model";
import { AppState, GeneralState, MapState, RadarImageState, RadarMetaState } from "./app.state";

export namespace AppSelectors {
    export const getRadarMeta = createFeatureSelector<RadarMetaState>('radarMeta');

    export const getRadarImage = createFeatureSelector<RadarImageState>('radarImage');

    export const getMap = createFeatureSelector<MapState>('map');

    export const getGeneral = createFeatureSelector<GeneralState>('general');

    export const getRadars = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => state.radars
    )

    export const getSelectedRadar = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => state.radars.find((radar: Radar) => radar.id === state.selectedRadarId)
    )

    export const getColorScale = createSelector(
        getRadarMeta,
        (state: RadarMetaState) => null
    )
}