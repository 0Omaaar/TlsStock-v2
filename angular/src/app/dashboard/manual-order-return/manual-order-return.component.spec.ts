import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualOrderReturnComponent } from './manual-order-return.component';

describe('ManualOrderReturnComponent', () => {
  let component: ManualOrderReturnComponent;
  let fixture: ComponentFixture<ManualOrderReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualOrderReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualOrderReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
