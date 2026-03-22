import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideMockStore } from '@ngrx/store/testing';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideMockStore({}), // ✅ mock ngrx store
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
