import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WokComponent } from './wok.component';

describe('WokComponent', () => {
  let component: WokComponent;
  let fixture: ComponentFixture<WokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
