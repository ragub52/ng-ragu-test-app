import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { InterceptorService } from './interceptor.service';
import { take } from 'rxjs/operators';
import { Item } from '../../model/list.model';
import { of } from 'rxjs';

describe('DataService', () => {
    let service: DataService;
    let interceptorSpy: jasmine.SpyObj<InterceptorService>;

    beforeEach(() => {
        interceptorSpy = jasmine.createSpyObj('InterceptorService', ['intercept']);

        TestBed.configureTestingModule({
            providers: [
                DataService,
                { provide: InterceptorService, useValue: interceptorSpy }
            ]
        });

        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return 10 items from getItems', (done) => {
        // If interceptor is used inside DataService, mock it to just pass through
        interceptorSpy.intercept.and.callFake((obs: any) => obs);

        service.getItems().pipe(take(1)).subscribe((items: Item[]) => {
            expect(items.length).toBe(10);

            // Check the first item structure
            const first = items[0];
            expect(first.id).toBe(1);
            expect(first.name).toBe('Item 1');
            expect(first.description).toBe('Description for item 1');

            done();
        });
    });
});
