import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaModalComponent } from './busqueda-modal.component';

describe('BusquedaModalComponent', () => {
  let component: BusquedaModalComponent;
  let fixture: ComponentFixture<BusquedaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
