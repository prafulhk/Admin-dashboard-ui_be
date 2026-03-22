import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideMockStore } from '@ngrx/store/testing';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              role: 'admin',
              token: 'dummy',
              loading: false,
              error: null,
            },
          },
          users: {
            users: [], // ✅ IMPORTANT
            loading: false,
            loaded: true,
          },
        } as any),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
