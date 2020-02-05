import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SappTestModule } from '../../../test.module';
import { RegionAngularComponent } from 'app/entities/region-angular/region-angular.component';
import { RegionAngularService } from 'app/entities/region-angular/region-angular.service';
import { RegionAngular } from 'app/shared/model/region-angular.model';

describe('Component Tests', () => {
  describe('RegionAngular Management Component', () => {
    let comp: RegionAngularComponent;
    let fixture: ComponentFixture<RegionAngularComponent>;
    let service: RegionAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [RegionAngularComponent],
        providers: []
      })
        .overrideTemplate(RegionAngularComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionAngularComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionAngularService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegionAngular(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.regions && comp.regions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
