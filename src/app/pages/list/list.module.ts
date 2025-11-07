import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list';
import { ListStore } from '../../store/list/list.store';

@NgModule({
    declarations: [ListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: ListComponent }]),
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
    ],
    providers: [ListStore]
})
export class ListModule { }
