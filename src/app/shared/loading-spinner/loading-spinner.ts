import { Component, inject, effect } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    @if (loadingService.loading()) {
      <div class="overlay">
        <mat-progress-spinner
          mode="indeterminate"
          color="accent"
          diameter="60"
        ></mat-progress-spinner>
      </div>
    }
  `,
  styleUrls: ['./loading-spinner.scss']
})
export class LoadingSpinner {
  loadingService = inject(LoadingService);
}
