import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SappTestModule } from '../../../test.module';
import { CountryAngularComponent } from 'app/entities/country-angular/country-angular.component';
import { CountryAngularService } from 'app/entities/country-angular/country-angular.service';
import { CountryAngular } from 'app/shared/model/country-angular.model';

describe('Component Tests', () => {
  describe('CountryAngular Management Component', () => {
    let comp: CountryAngularComponent;
    let fixture: ComponentFixture<CountryAngularComponent>;
    let service: CountryAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [CountryAngularComponent],
        providers: []
      })
        .overrideTemplate(CountryAngularComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryAngularComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryAngularService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CountryAngular(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.countries && comp.countries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
