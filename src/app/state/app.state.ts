import { Image } from "../models/Image.model"
import { Radar } from "../models/Radar.model"
import { BaseMapLayer } from "../utils/BaseMapLayer"

export interface AppState {
    layers: BaseMapLayer[],
    radars: Radar[],
    selectedRadarId: number,
    images: Image[],
    selectedImageId: number,
    errorMessage: string
}

export const initialState: AppState = {
    layers: [],
    radars: [],
    selectedRadarId: null,
    images: [],
    selectedImageId: null,
    errorMessage: ''
}