import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class InterceptorService {

    /**
     * Constructor
     * @param loadingService - Loading service
     */
    constructor(private loadingService: LoadingService) { }

    /**
     * Intercepts observal
     * @param obs$ - Observable
     * @returns Observable
     */
    intercept<T>(obs$: Observable<T>): Observable<T> {
        this.loadingService.show();

        return obs$.pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}
