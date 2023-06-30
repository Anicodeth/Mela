import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCampaignsPageComponent } from './all-campaigns-page.component';

describe('AllCampaignPageComponent', () => {
  let component: AllCampaignsPageComponent;
  let fixture: ComponentFixture<AllCampaignsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCampaignsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCampaignsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
