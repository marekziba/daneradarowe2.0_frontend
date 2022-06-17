import BaseLayer from "ol/layer/Base";

export class BaseMapLayer {
    constructor(id: number, layer: BaseLayer, controlIconPath: string = 'X') {
        this._id = id;
        this._layer = layer;
        this._controlIconPath = controlIconPath;
    }
    
    
    private _id : number;

    public get id() : number {
        return this._id;
    }
    

    private _layer : BaseLayer;

    public get layer() : BaseLayer {
        return this._layer;
    }
     
    private _controlIconPath : string;

    public get controlIconPath() : string {
        return this._controlIconPath;
    }

    public set controlIconPath(v : string) {
        this._controlIconPath = v;
    }
    
    toggleVisibility() {
        const visibility = this._layer.getVisible()
        this._layer.setVisible(!visibility);
    }

    isVisible(): boolean {
        return this._layer.getVisible();
    }
}