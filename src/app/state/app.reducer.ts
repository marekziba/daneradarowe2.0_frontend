import { Statement } from "@angular/compiler";
import { createReducer, on } from "@ngrx/store";
import { BaseMapLayer } from "../utils/BaseMapLayer";
import { AppActions } from "./app.actions";
import { AppState, GeneralState, initialGeneralState, initialMapState, initialRadarImageState, initialRadarMetaState, MapState, RadarImageState, RadarMetaState } from "./app.state";


export const radarMetaReducer = createReducer<RadarMetaState>(initialRadarMetaState,
    on(AppActions.radarLoadSuccess, (state, action) => {
        return {
            ...state,
            radars: action.radars
        }
    })
);

export const radarImageReducer = createReducer<RadarImageState>(initialRadarImageState);

export const mapReducer = createReducer<MapState>(initialMapState,
    on(AppActions.layersLoadSuccess, (state, action): MapState => {
        return {
            ...state, 
            layers: action.layers
        }
    }),
    on(AppActions.updateMapLayer, (state, action): MapState => {
        const previousLayer = state.layers.find(layer => layer.id === action.layer.id);
        if(action.preserveVisibility && !previousLayer.isVisible()){
            action.layer.toggleVisibility();
        }
        return {
            ...state,
            layers: state.layers.map((layer: BaseMapLayer) => layer.id == action.layer.id ? action.layer : layer )
        }
    })
);

export const generalReducer = createReducer<GeneralState>(initialGeneralState,
    on(AppActions.layersLoadFailure, (state, action): GeneralState => {
        return {
            ...state,
            error: action.error
        }
    })
);