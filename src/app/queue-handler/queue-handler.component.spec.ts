import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueHandlerComponent } from './queue-handler.component';

describe('QueueHandlerComponent', () => {
  let component: QueueHandlerComponent;
  let fixture: ComponentFixture<QueueHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueueHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
