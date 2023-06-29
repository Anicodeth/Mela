import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCampaignPageComponent } from './all-campaign-page.component';

describe('AllCampaignPageComponent', () => {
  let component: AllCampaignPageComponent;
  let fixture: ComponentFixture<AllCampaignPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCampaignPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCampaignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
