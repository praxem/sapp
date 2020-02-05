import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { JobHistoryAngularDetailComponent } from 'app/entities/job-history-angular/job-history-angular-detail.component';
import { JobHistoryAngular } from 'app/shared/model/job-history-angular.model';

describe('Component Tests', () => {
  describe('JobHistoryAngular Management Detail Component', () => {
    let comp: JobHistoryAngularDetailComponent;
    let fixture: ComponentFixture<JobHistoryAngularDetailComponent>;
    const route = ({ data: of({ jobHistory: new JobHistoryAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [JobHistoryAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(JobHistoryAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobHistoryAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load jobHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
