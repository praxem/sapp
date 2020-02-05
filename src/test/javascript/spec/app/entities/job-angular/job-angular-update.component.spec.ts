import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { JobAngularUpdateComponent } from 'app/entities/job-angular/job-angular-update.component';
import { JobAngularService } from 'app/entities/job-angular/job-angular.service';
import { JobAngular } from 'app/shared/model/job-angular.model';

describe('Component Tests', () => {
  describe('JobAngular Management Update Component', () => {
    let comp: JobAngularUpdateComponent;
    let fixture: ComponentFixture<JobAngularUpdateComponent>;
    let service: JobAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [JobAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(JobAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobAngular(123);
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
        const entity = new JobAngular();
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
