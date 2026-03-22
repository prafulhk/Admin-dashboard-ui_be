import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ✅ ensures no pending requests
  });

  it('should call login API', () => {
    const mockPayload = {
      email: 'test@test.com',
      password: '123456',
    };

    service.login(mockPayload).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login'); // ✅ match your actual API

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload); // ✅ important

    // simulate backend response
    req.flush({
      token: 'dummy-token',
    });
  });
});
