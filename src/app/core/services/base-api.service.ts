import { delay, Observable, of, switchMap, throwError, timer } from 'rxjs';

export abstract class BaseApiService<T> {

    /**
     * Simualte response with some delay
     * @param data - Response data
     * @param delayMs - delay
     * @returns Observable of response
     */
    protected simulateResponse(data: T, delayMs = 800): Observable<T> {
        return of(data).pipe(delay(delayMs));
    }

    /**
     * Simualte error with some delay
     * @param data - Response data
     * @param delayMs - delay
     * @returns Throws error after the delay
     */
    protected simulateError(message: string, delayMs = 500): Observable<never> {
        return timer(delayMs).pipe(
            switchMap(() => throwError(() => new Error(message)))
        );
    }
}
