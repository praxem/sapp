import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { DepartmentAngularUpdateComponent } from 'app/entities/department-angular/department-angular-update.component';
import { DepartmentAngularService } from 'app/entities/department-angular/department-angular.service';
import { DepartmentAngular } from 'app/shared/model/department-angular.model';

describe('Component Tests', () => {
  describe('DepartmentAngular Management Update Component', () => {
    let comp: DepartmentAngularUpdateComponent;
    let fixture: ComponentFixture<DepartmentAngularUpdateComponent>;
    let service: DepartmentAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [DepartmentAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DepartmentAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentAngular(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentAngular();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
