import { Injectable, computed } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, switchMap, tap, of, finalize } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { ListState, Item } from '../../model/list.model';

@Injectable()
export class ListStore extends ComponentStore<ListState> {
    /** 
     * @param dataService - Data service
     */
    constructor(private dataService: DataService) {
        // Initilizing the state.
        super({ items: [], loading: false, error: null });
    }

    /**
     * List of items
     */
    readonly items = this.selectSignal(state => state.items);

    /**
     * Loading 
     */
    readonly loading = this.selectSignal(state => state.loading);

    /**
     * Error state
     */
    readonly error = this.selectSignal(state => state.error);

    /**
     * Computed signals
     */
    readonly vm = computed(() => ({
        items: this.items(),
        loading: this.loading(),
        error: this.error()
    }));

    readonly loadItems = this.effect<void>(trigger$ =>
        trigger$.pipe(
            tap(() => this.patchState({ loading: true, error: null })), // Set loading true
            switchMap(() =>
                this.dataService.getItems().pipe(
                    tap(items => {
                        this.patchState({ items });
                    }), // Updating items
                    catchError(err => {
                        this.patchState({ error: err.message || 'Failed to load items' });
                        return of([]);
                    }),
                    finalize(() => this.patchState({ loading: false }))
                )
            )
        )
    );
}
