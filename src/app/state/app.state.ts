import { Image } from "../models/Image.model"
import { Product } from "../models/Product.model"
import { Radar } from "../models/Radar.model"
import { BaseMapLayer } from "../utils/BaseMapLayer"
import { Config } from "../utils/Config"

export interface RadarMetaState {
    radars: Radar[],
    selectedRadarId: number,
    products: Product[],
    selectedProductVariantId: number 
}

export interface RadarImageState {
    images: Image[],
    selectedImageId: number
}

export interface MapState {
    layers: BaseMapLayer[]
}

export interface GeneralState {
    error: string,
    darkModeEnabled: boolean,
    selectionModeEnabled: boolean
}

export interface AppState {
    radarMeta: RadarMetaState,
    radarImage: RadarImageState,
    general: GeneralState
}

export interface State {
    radarMeta: RadarMetaState,
    radarImage: RadarImageState,
    map: MapState,
    general: GeneralState
}

export const initialRadarMetaState = {
    radars: [],
    selectedRadarId: null,
    products: [],
    selectedProductVariantId: null
} as RadarMetaState

export const initialRadarImageState = {
    images: [],
    selectedImageId: null
} as RadarImageState;

export const initialMapState = {
    layers: []
} as MapState;

export const initialGeneralState = {
    error: '',
    darkModeEnabled: false,
    selectionModeEnabled: false
} as GeneralState;

// export const initialState: AppState = {
//     radarMeta: {
//         radars: [],
//         selectedRadarId: null,
//         products: [],
//         selectedProductVariantId: null
//     },
//     radarImage: {
//         images: [],
//         selectedImageId: null
//     },
//     general: {
//         error: '',
//         darkModeEnabled: false,
//         selectionModeEnabled: false
//     }
// }