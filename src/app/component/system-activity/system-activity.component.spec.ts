import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemActivityComponent } from './system-activity.component';

describe('SystemActivityComponent', () => {
  let component: SystemActivityComponent;
  let fixture: ComponentFixture<SystemActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
