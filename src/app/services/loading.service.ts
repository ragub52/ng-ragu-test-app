import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    // Use Angular signal for reactive state
    public loading = signal(false);

    activeRequests = 0;

    /**
     * Show loader
     */
    show(): void {
        this.activeRequests++;
        this.loading.set(true);
    }

    /**
     * Hide loader
     */
    hide(): void {
        this.activeRequests--;

        if (this.activeRequests <= 0) {
            this.loading.set(false);
            this.activeRequests = 0;
        }
    }
}
