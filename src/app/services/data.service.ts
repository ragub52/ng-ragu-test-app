import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InterceptorService } from './interceptor.service';
import { BaseApiService } from './base-api.service';
import { Item } from '../model/list.model';

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
    getItems() {
        return this.interceptorService.intercept(of([
            { id: 1, name: 'Item One', description: 'First item description' },
            { id: 2, name: 'Item Two', description: 'Second item description' },
            { id: 3, name: 'Item Three', description: 'Third item description' }
        ]));
    }
}
