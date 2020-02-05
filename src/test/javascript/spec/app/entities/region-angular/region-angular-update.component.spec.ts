import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SappTestModule } from '../../../test.module';
import { RegionAngularUpdateComponent } from 'app/entities/region-angular/region-angular-update.component';
import { RegionAngularService } from 'app/entities/region-angular/region-angular.service';
import { RegionAngular } from 'app/shared/model/region-angular.model';

describe('Component Tests', () => {
  describe('RegionAngular Management Update Component', () => {
    let comp: RegionAngularUpdateComponent;
    let fixture: ComponentFixture<RegionAngularUpdateComponent>;
    let service: RegionAngularService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SappTestModule],
        declarations: [RegionAngularUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RegionAngularUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionAngularUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionAngularService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegionAngular(123);
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
        const entity = new RegionAngular();
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
