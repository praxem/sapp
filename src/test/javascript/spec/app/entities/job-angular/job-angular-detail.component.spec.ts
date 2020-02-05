import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { JobAngularDetailComponent } from 'app/entities/job-angular/job-angular-detail.component';
import { JobAngular } from 'app/shared/model/job-angular.model';

describe('Component Tests', () => {
  describe('JobAngular Management Detail Component', () => {
    let comp: JobAngularDetailComponent;
    let fixture: ComponentFixture<JobAngularDetailComponent>;
    const route = ({ data: of({ job: new JobAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [JobAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(JobAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load job on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.job).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
