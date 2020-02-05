import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { CountryAngularDetailComponent } from 'app/entities/country-angular/country-angular-detail.component';
import { CountryAngular } from 'app/shared/model/country-angular.model';

describe('Component Tests', () => {
  describe('CountryAngular Management Detail Component', () => {
    let comp: CountryAngularDetailComponent;
    let fixture: ComponentFixture<CountryAngularDetailComponent>;
    const route = ({ data: of({ country: new CountryAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [CountryAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CountryAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load country on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.country).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
