import { createAction, props } from "@ngrx/store";
import { Radar } from "../models/Radar.model";
import { BaseMapLayer } from "../utils/BaseMapLayer";

export namespace AppActions {
    export const loadRadars = createAction(
        '[Radar] Load List Of Radars'
    );

    export const radarLoadSuccess = createAction(
        '[Radar] Successfully Loaded List Of Radars',
        props<{ radars: Radar[] }>()
    );

    export const radarLoadFailure = createAction(
        '[Radar] Failed To Load List Of Radars',
        props<{ error: string }>()
    );

    export const loadMapLayers = createAction(
        '[Map] Load Map Layers'
    );

    export const layersLoadSuccess = createAction(
        '[Map] Layers Successfuly Loaded',
        props<{ layers: BaseMapLayer[] }>()
    );

    export const loadMapLayersFailure = createAction(
        '[Map] Failed Loading Map Layers',
        props<{ error: string }>()
    );

    export const updateMapLayer = createAction(
        '[Map] Update Map Layer',
        props<{ layer: BaseMapLayer, preserveVisibility: boolean }>()
    );
}