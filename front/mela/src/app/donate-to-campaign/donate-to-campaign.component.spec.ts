import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateToCampaignComponent } from './donate-to-campaign.component';

describe('DonateToCampaignComponent', () => {
  let component: DonateToCampaignComponent;
  let fixture: ComponentFixture<DonateToCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateToCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateToCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
