import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

describe(`TokenInterceptor`, () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
              HttpClient,

          ],
      });

      http = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
      httpMock.verify();
  });

  it('should add jwt token to request', () => {

      http.get('/dummy').subscribe();
      console.info('foo')

      const httpRequest = httpMock.expectOne('/dummy');
  });
});