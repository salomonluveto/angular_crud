import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDestroyComponent } from './modal-destroy.component';

describe('ModalDestroyComponent', () => {
  let component: ModalDestroyComponent;
  let fixture: ComponentFixture<ModalDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDestroyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
