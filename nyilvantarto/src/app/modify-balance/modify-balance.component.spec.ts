import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBalanceComponent } from './modify-balance.component';

describe('ModifyBalanceComponent', () => {
  let component: ModifyBalanceComponent;
  let fixture: ComponentFixture<ModifyBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
