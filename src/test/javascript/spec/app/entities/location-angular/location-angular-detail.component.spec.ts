import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { LocationAngularDetailComponent } from 'app/entities/location-angular/location-angular-detail.component';
import { LocationAngular } from 'app/shared/model/location-angular.model';

describe('Component Tests', () => {
  describe('LocationAngular Management Detail Component', () => {
    let comp: LocationAngularDetailComponent;
    let fixture: ComponentFixture<LocationAngularDetailComponent>;
    const route = ({ data: of({ location: new LocationAngular(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [LocationAngularDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LocationAngularDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocationAngularDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load location on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
