import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SappTestModule } from '../../../test.module';
import { TaskAngularComponent } from 'app/entities/task-angular/task-angular.component';
import { TaskAngularService } from 'app/entities/task-angular/task-angular.service';
import { TaskAngular } from 'app/shared/model/task-angular.model';

describe('Component Tests', () => {
  describe('TaskAngular Management Component', () => {
    let comp: TaskAngularComponent;
    let fixture: ComponentFixture<TaskAngularComponent>;
    let service: TaskAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [TaskAngularComponent],
        providers: []
      })
        .overrideTemplate(TaskAngularComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskAngularComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskAngularService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TaskAngular(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tasks && comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
