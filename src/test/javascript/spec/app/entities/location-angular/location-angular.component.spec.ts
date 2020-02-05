import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SappTestModule } from '../../../test.module';
import { LocationAngularComponent } from 'app/entities/location-angular/location-angular.component';
import { LocationAngularService } from 'app/entities/location-angular/location-angular.service';
import { LocationAngular } from 'app/shared/model/location-angular.model';

describe('Component Tests', () => {
  describe('LocationAngular Management Component', () => {
    let comp: LocationAngularComponent;
    let fixture: ComponentFixture<LocationAngularComponent>;
    let service: LocationAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [LocationAngularComponent],
        providers: []
      })
        .overrideTemplate(LocationAngularComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationAngularComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationAngularService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocationAngular(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.locations && comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
