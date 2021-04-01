import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ECommTestModule } from '../../../test.module';
import { ClothingUpdateComponent } from 'app/entities/clothing/clothing-update.component';
import { ClothingService } from 'app/entities/clothing/clothing.service';
import { Clothing } from 'app/shared/model/clothing.model';

describe('Component Tests', () => {
  describe('Clothing Management Update Component', () => {
    let comp: ClothingUpdateComponent;
    let fixture: ComponentFixture<ClothingUpdateComponent>;
    let service: ClothingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ECommTestModule],
        declarations: [ClothingUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClothingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClothingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClothingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Clothing(123);
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
        const entity = new Clothing();
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
