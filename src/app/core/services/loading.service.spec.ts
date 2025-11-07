import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
    let service: LoadingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoadingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have initial loading state as false', () => {
        expect(service.loading()).toBeFalse();
        expect(service.activeRequests).toBe(0);
    });

    it('show() should set loading to true and increment activeRequests', () => {
        service.show();
        expect(service.loading()).toBeTrue();
        expect(service.activeRequests).toBe(1);

        service.show();
        expect(service.activeRequests).toBe(2);
    });

    it('hide() should decrement activeRequests and set loading to false when 0', () => {
        service.show();
        service.show();
        expect(service.loading()).toBeTrue();
        expect(service.activeRequests).toBe(2);

        service.hide();
        expect(service.loading()).toBeTrue();
        expect(service.activeRequests).toBe(1);

        service.hide();
        expect(service.loading()).toBeFalse();
        expect(service.activeRequests).toBe(0);
    });

    it('hide() should not set activeRequests below 0', () => {
        service.hide();
        expect(service.activeRequests).toBe(0);
        expect(service.loading()).toBeFalse();
    });
});
