import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { ECommTestModule } from '../../../test.module';
import { ElectronicsDetailComponent } from 'app/entities/electronics/electronics-detail.component';
import { Electronics } from 'app/shared/model/electronics.model';

describe('Component Tests', () => {
  describe('Electronics Management Detail Component', () => {
    let comp: ElectronicsDetailComponent;
    let fixture: ComponentFixture<ElectronicsDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ electronics: new Electronics(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ECommTestModule],
        declarations: [ElectronicsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ElectronicsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ElectronicsDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load electronics on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.electronics).toEqual(jasmine.objectContaining({ id: 123 }));
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
