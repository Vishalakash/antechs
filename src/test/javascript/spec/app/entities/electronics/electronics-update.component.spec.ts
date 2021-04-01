import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ECommTestModule } from '../../../test.module';
import { ElectronicsUpdateComponent } from 'app/entities/electronics/electronics-update.component';
import { ElectronicsService } from 'app/entities/electronics/electronics.service';
import { Electronics } from 'app/shared/model/electronics.model';

describe('Component Tests', () => {
  describe('Electronics Management Update Component', () => {
    let comp: ElectronicsUpdateComponent;
    let fixture: ComponentFixture<ElectronicsUpdateComponent>;
    let service: ElectronicsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ECommTestModule],
        declarations: [ElectronicsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ElectronicsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ElectronicsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ElectronicsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Electronics(123);
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
        const entity = new Electronics();
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
