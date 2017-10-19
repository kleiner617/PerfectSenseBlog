import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { PerfectSenseBlogSharedModule, UserRouteAccessService } from './shared';
import { PerfectSenseBlogHomeModule } from './home/home.module';
import { PerfectSenseBlogAdminModule } from './admin/admin.module';
import { PerfectSenseBlogAccountModule } from './account/account.module';
import { PerfectSenseBlogEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        PerfectSenseBlogSharedModule,
        PerfectSenseBlogHomeModule,
        PerfectSenseBlogAdminModule,
        PerfectSenseBlogAccountModule,
        PerfectSenseBlogEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class PerfectSenseBlogAppModule {}
