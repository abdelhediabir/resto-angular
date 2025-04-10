import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeclientComponent } from './commandeclient.component';

describe('CommandeclientComponent', () => {
  let component: CommandeclientComponent;
  let fixture: ComponentFixture<CommandeclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeclientComponent]
    });
    fixture = TestBed.createComponent(CommandeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
