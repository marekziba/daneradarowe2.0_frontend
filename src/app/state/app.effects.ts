import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { combineLatest, Observable } from "rxjs";
import { combineLatestInit } from "rxjs/internal/observable/combineLatest";
import { BaseProviderService } from "../services/base-provider.service";
import { BaseMapLayer } from "../utils/BaseMapLayer";
import { AppActions } from "./app.actions";

@Injectable()
export class AppEffects {
    private providers: Observable<BaseMapLayer>[];

    constructor(private actions$: Actions, private dataService: DataService) {
        this.providers = [dataService].map(provider => provider.getLayer())
    }

    loadLayers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.loadMapLayers)
        )
    })
}