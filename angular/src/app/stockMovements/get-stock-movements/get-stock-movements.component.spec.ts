import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStockMovementsComponent } from './get-stock-movements.component';

describe('GetStockMovementsComponent', () => {
  let component: GetStockMovementsComponent;
  let fixture: ComponentFixture<GetStockMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStockMovementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetStockMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
