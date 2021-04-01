import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ECommTestModule } from '../../../test.module';
import { ElectronicsComponent } from 'app/entities/electronics/electronics.component';
import { ElectronicsService } from 'app/entities/electronics/electronics.service';
import { Electronics } from 'app/shared/model/electronics.model';

describe('Component Tests', () => {
  describe('Electronics Management Component', () => {
    let comp: ElectronicsComponent;
    let fixture: ComponentFixture<ElectronicsComponent>;
    let service: ElectronicsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ECommTestModule],
        declarations: [ElectronicsComponent],
      })
        .overrideTemplate(ElectronicsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ElectronicsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ElectronicsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Electronics(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.electronics && comp.electronics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
