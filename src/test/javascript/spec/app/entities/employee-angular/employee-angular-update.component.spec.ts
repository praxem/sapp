import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { EmployeeAngularUpdateComponent } from 'app/entities/employee-angular/employee-angular-update.component';
import { EmployeeAngularService } from 'app/entities/employee-angular/employee-angular.service';
import { EmployeeAngular } from 'app/shared/model/employee-angular.model';

describe('Component Tests', () => {
  describe('EmployeeAngular Management Update Component', () => {
    let comp: EmployeeAngularUpdateComponent;
    let fixture: ComponentFixture<EmployeeAngularUpdateComponent>;
    let service: EmployeeAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [EmployeeAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeeAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeAngular(123);
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
        const entity = new EmployeeAngular();
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
