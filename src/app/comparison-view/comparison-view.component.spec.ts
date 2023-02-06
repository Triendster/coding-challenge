import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonViewComponent } from './comparison-view.component';

describe('ComparisonViewComponent', () => {
  let component: ComparisonViewComponent;
  let fixture: ComponentFixture<ComparisonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
