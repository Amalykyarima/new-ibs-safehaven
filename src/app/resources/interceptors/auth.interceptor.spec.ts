import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';

// Mock next handler
const mockNextHandler: HttpHandlerFn = (req) => of(new HttpResponse({body: 'test'}));

describe('authInterceptor', () => {
  it('should add authorization header', () => {
    // Create a mock request
    const mockRequest = new HttpRequest('GET', '/test');

    // Spy on the request clone to verify it's called
    spyOn(mockRequest, 'clone').and.callThrough();

    // Execute the interceptor
    authInterceptor(mockRequest, mockNextHandler).subscribe();

    // Verify the request was cloned with auth header
    expect(mockRequest.clone).toHaveBeenCalledWith({
      setHeaders: {
        Authorization: 'Bearer fake-token' // Update this to match your expected token
      }
    });
  });

  // Add more test cases as needed
});
