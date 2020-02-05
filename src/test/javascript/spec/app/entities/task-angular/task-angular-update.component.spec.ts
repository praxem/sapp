import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { TaskAngularUpdateComponent } from 'app/entities/task-angular/task-angular-update.component';
import { TaskAngularService } from 'app/entities/task-angular/task-angular.service';
import { TaskAngular } from 'app/shared/model/task-angular.model';

describe('Component Tests', () => {
  describe('TaskAngular Management Update Component', () => {
    let comp: TaskAngularUpdateComponent;
    let fixture: ComponentFixture<TaskAngularUpdateComponent>;
    let service: TaskAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [TaskAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TaskAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TaskAngular(123);
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
        const entity = new TaskAngular();
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
