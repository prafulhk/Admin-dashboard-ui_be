import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { provideMockStore } from '@ngrx/store/testing';
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              role: 'admin',
              token: 'dummy',
              loading: false,
              error: null,
            },
            users: {
              users: [], // ✅ NOW CORRECT
              loading: false,
              loaded: true,
            },
          },
        } as any),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
