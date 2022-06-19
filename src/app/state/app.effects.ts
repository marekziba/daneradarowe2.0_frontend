import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, combineLatest, map, mergeMap, Observable, of } from "rxjs";
import { combineLatestInit } from "rxjs/internal/observable/combineLatest";
import { BaseProviderService } from "../services/base-provider.service";
import { RadarImageService } from "../services/radar-image.service";
import { BaseMapLayer } from "../utils/BaseMapLayer";
import { AppActions } from "./app.actions";

@Injectable()
export class AppEffects {
    private providers: Observable<BaseMapLayer>[];

    constructor(private actions$: Actions, private radarImageService: RadarImageService) {
        this.providers = [radarImageService].map(provider => provider.getLayer())
    }

    loadLayers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.loadMapLayers),
            mergeMap(() => combineLatest(this.providers).pipe(
                map((layers: BaseMapLayer[]) => AppActions.layersLoadSuccess({ layers })),
                catchError((error => of(AppActions.layersLoadFailure({ error })) ))
            ))
        )
    })
}