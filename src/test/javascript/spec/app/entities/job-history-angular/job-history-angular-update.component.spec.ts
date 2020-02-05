import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { JobHistoryAngularUpdateComponent } from 'app/entities/job-history-angular/job-history-angular-update.component';
import { JobHistoryAngularService } from 'app/entities/job-history-angular/job-history-angular.service';
import { JobHistoryAngular } from 'app/shared/model/job-history-angular.model';

describe('Component Tests', () => {
  describe('JobHistoryAngular Management Update Component', () => {
    let comp: JobHistoryAngularUpdateComponent;
    let fixture: ComponentFixture<JobHistoryAngularUpdateComponent>;
    let service: JobHistoryAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [JobHistoryAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(JobHistoryAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobHistoryAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobHistoryAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobHistoryAngular(123);
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
        const entity = new JobHistoryAngular();
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
