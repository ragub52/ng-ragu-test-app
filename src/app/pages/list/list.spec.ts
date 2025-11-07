import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ListStore } from '../../store/list/list.store';
import { ListState } from '../../model/list.model';
import { ListComponent } from './list';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storeMock: Partial<ListStore>;

  beforeEach(async () => {
    // Mock vm signal
    const vmSignal = signal<ListState>({ items: [], loading: false, error: null });

    storeMock = {
      vm: vmSignal,
      loadItems: jasmine.createSpy('loadItems').and.callFake(() => {
        // simulate store updating vm after load
        vmSignal.set({ items: [{ id: 1, name: 'Item 1', description: 'Desc' }], loading: true, error: null });
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [MatCardModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule],
      providers: [{ provide: ListStore, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call store.loadItems on ngOnInit', () => {
    component.ngOnInit();
    expect(storeMock.loadItems).toHaveBeenCalled();
  });

  it('should update vm signal after loadItems is called', () => {
    component.ngOnInit(); // triggers loadItems()
    const vmValue = component.vm();
    expect(vmValue.loading).toBeTrue();
    expect(vmValue.items.length).toBe(1);
    expect(vmValue.items[0].name).toBe('Item 1');
  });

  it('should have correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual(['id', 'name', 'description']);
  });
});
