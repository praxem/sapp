import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { EmployeeAngularDetailComponent } from 'app/entities/employee-angular/employee-angular-detail.component';
import { EmployeeAngular } from 'app/shared/model/employee-angular.model';

describe('Component Tests', () => {
  describe('EmployeeAngular Management Detail Component', () => {
    let comp: EmployeeAngularDetailComponent;
    let fixture: ComponentFixture<EmployeeAngularDetailComponent>;
    const route = ({ data: of({ employee: new EmployeeAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [EmployeeAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load employee on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
