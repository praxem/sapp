import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { DepartmentAngularDetailComponent } from 'app/entities/department-angular/department-angular-detail.component';
import { DepartmentAngular } from 'app/shared/model/department-angular.model';

describe('Component Tests', () => {
  describe('DepartmentAngular Management Detail Component', () => {
    let comp: DepartmentAngularDetailComponent;
    let fixture: ComponentFixture<DepartmentAngularDetailComponent>;
    const route = ({ data: of({ department: new DepartmentAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [DepartmentAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepartmentAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load department on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
