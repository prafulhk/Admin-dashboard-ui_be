import { TestBed } from '@angular/core/testing';

import { ActivityLog } from './activity-log';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ActivityLog', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLog], // ✅ standalone component
      providers: [
        provideHttpClient(), // ✅ real http
        provideHttpClientTesting(), // ✅ mock http
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ActivityLog);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
