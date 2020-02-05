import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SappTestModule } from '../../../test.module';
import { DepartmentAngularComponent } from 'app/entities/department-angular/department-angular.component';
import { DepartmentAngularService } from 'app/entities/department-angular/department-angular.service';
import { DepartmentAngular } from 'app/shared/model/department-angular.model';

describe('Component Tests', () => {
  describe('DepartmentAngular Management Component', () => {
    let comp: DepartmentAngularComponent;
    let fixture: ComponentFixture<DepartmentAngularComponent>;
    let service: DepartmentAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [DepartmentAngularComponent],
        providers: []
      })
        .overrideTemplate(DepartmentAngularComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentAngularComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentAngularService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DepartmentAngular(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departments && comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
