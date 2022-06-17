import { Statement } from "@angular/compiler";
import { createReducer, on } from "@ngrx/store";
import { BaseMapLayer } from "../utils/BaseMapLayer";
import { AppActions } from "./app.actions";
import { AppState, initialState } from "./app.state";

export const appReducer = createReducer<AppState>(
    initialState,
    on(AppActions.radarLoadSuccess, (state, action): AppState => {
        return {
            ...state,
            radars: action.radars,
            errorMessage: ''
        }
    }),
    on(AppActions.loadMapLayersFailure, (state, action): AppState => {
        return {
            ...state,
            errorMessage: action.error
        }
    }),
    on(AppActions.layersLoadSuccess, (state, action): AppState => {
        return {
            ...state,
            layers: action.layers
        }
    }),
    on(AppActions.loadMapLayersFailure, (state, action): AppState => {
        return {
            ...state,
            errorMessage: action.error
        }
    }),
    on(AppActions.updateMapLayer, (state, action): AppState => {
        const previousLayer = state.layers.find(layer => layer.id === action.layer.id);
        if(action.preserveVisibility && !previousLayer.isVisible()){
            action.layer.toggleVisibility();
        }
        return {
            ...state,
            layers: state.layers.map((layer: BaseMapLayer) => layer.id == action.layer.id ? action.layer : layer )
        }
    }),
)