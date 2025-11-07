import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InterceptorService } from './interceptor.service';
import { BaseApiService } from './base-api.service';
import { Item } from '../../model/list.model';

@Injectable({ providedIn: 'root' })
export class DataService extends BaseApiService<Item[]> {

    /**
    * Constructor
    * @param interceptorService - Interceptor service
    */
    constructor(private interceptorService: InterceptorService) {
        super();
    }

    /** 
     * List items API
     */
    getItems(): Observable<Item[]> {
        const items: Item[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `Item ${i + 1}`,
            description: `Description for item ${i + 1}`
        }));

        return of(items).pipe(delay(1000));
    }
}
