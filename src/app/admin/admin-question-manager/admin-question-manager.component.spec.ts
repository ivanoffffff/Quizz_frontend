import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionManagerComponent } from './admin-question-manager.component';

describe('AdminQuestionManagerComponent', () => {
  let component: AdminQuestionManagerComponent;
  let fixture: ComponentFixture<AdminQuestionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
