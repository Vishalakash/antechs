import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ECommTestModule } from '../../../test.module';
import { ClothingComponent } from 'app/entities/clothing/clothing.component';
import { ClothingService } from 'app/entities/clothing/clothing.service';
import { Clothing } from 'app/shared/model/clothing.model';

describe('Component Tests', () => {
  describe('Clothing Management Component', () => {
    let comp: ClothingComponent;
    let fixture: ComponentFixture<ClothingComponent>;
    let service: ClothingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ECommTestModule],
        declarations: [ClothingComponent],
      })
        .overrideTemplate(ClothingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClothingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClothingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Clothing(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.clothing && comp.clothing[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
