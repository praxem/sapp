import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { TaskAngularDetailComponent } from 'app/entities/task-angular/task-angular-detail.component';
import { TaskAngular } from 'app/shared/model/task-angular.model';

describe('Component Tests', () => {
  describe('TaskAngular Management Detail Component', () => {
    let comp: TaskAngularDetailComponent;
    let fixture: ComponentFixture<TaskAngularDetailComponent>;
    const route = ({ data: of({ task: new TaskAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [TaskAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TaskAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load task on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
