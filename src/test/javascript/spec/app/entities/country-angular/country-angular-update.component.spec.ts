import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { CountryAngularUpdateComponent } from 'app/entities/country-angular/country-angular-update.component';
import { CountryAngularService } from 'app/entities/country-angular/country-angular.service';
import { CountryAngular } from 'app/shared/model/country-angular.model';

describe('Component Tests', () => {
  describe('CountryAngular Management Update Component', () => {
    let comp: CountryAngularUpdateComponent;
    let fixture: ComponentFixture<CountryAngularUpdateComponent>;
    let service: CountryAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [CountryAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CountryAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CountryAngular(123);
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
        const entity = new CountryAngular();
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
