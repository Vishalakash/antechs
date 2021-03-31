import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ECommSharedModule } from 'app/shared/shared.module';
import { ECommCoreModule } from 'app/core/core.module';
import { ECommAppRoutingModule } from './app-routing.module';
import { ECommHomeModule } from './home/home.module';
import { ECommEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ECommSharedModule,
    ECommCoreModule,
    ECommHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ECommEntityModule,
    ECommAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class ECommAppModule {}
