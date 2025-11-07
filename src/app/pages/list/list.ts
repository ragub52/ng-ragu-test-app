import { Component, inject, OnInit } from '@angular/core';
import { ListStore } from '../../store/list/list.store';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class ListComponent implements OnInit {
  /**
   * Store instance
   */
  store = inject(ListStore);

  /**
   * Columns
   */
  displayedColumns = ['id', 'name', 'description'];


  /**
   * Reactive store state for template usage
   */
  readonly vm = this.store.vm;


  /**
   * Angualr on init
   */
  ngOnInit(): void {
    this.store.loadItems();
  }
}
