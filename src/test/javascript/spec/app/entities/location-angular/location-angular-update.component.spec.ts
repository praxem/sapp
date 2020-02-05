import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { LocationAngularUpdateComponent } from 'app/entities/location-angular/location-angular-update.component';
import { LocationAngularService } from 'app/entities/location-angular/location-angular.service';
import { LocationAngular } from 'app/shared/model/location-angular.model';

describe('Component Tests', () => {
  describe('LocationAngular Management Update Component', () => {
    let comp: LocationAngularUpdateComponent;
    let fixture: ComponentFixture<LocationAngularUpdateComponent>;
    let service: LocationAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [LocationAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LocationAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocationAngular(123);
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
        const entity = new LocationAngular();
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
