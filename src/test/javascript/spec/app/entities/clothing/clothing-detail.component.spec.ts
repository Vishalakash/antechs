import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { ECommTestModule } from '../../../test.module';
import { ClothingDetailComponent } from 'app/entities/clothing/clothing-detail.component';
import { Clothing } from 'app/shared/model/clothing.model';

describe('Component Tests', () => {
  describe('Clothing Management Detail Component', () => {
    let comp: ClothingDetailComponent;
    let fixture: ComponentFixture<ClothingDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ clothing: new Clothing(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ECommTestModule],
        declarations: [ClothingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClothingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClothingDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load clothing on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clothing).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
