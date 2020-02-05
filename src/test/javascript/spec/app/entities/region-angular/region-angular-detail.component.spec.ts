import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { RegionAngularDetailComponent } from 'app/entities/region-angular/region-angular-detail.component';
import { RegionAngular } from 'app/shared/model/region-angular.model';

describe('Component Tests', () => {
  describe('RegionAngular Management Detail Component', () => {
    let comp: RegionAngularDetailComponent;
    let fixture: ComponentFixture<RegionAngularDetailComponent>;
    const route = ({ data: of({ region: new RegionAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [RegionAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RegionAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegionAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load region on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.region).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
