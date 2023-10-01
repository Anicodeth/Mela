import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlComponent } from './withdrawl.component';

describe('WithdrawlComponent', () => {
  let component: WithdrawlComponent;
  let fixture: ComponentFixture<WithdrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
