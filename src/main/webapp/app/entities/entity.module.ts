import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PerfectSenseBlogBlogModule } from './blog/blog.module';
import { PerfectSenseBlogCommentModule } from './comment/comment.module';
import { PerfectSenseBlogAuthorModule } from './author/author.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PerfectSenseBlogBlogModule,
        PerfectSenseBlogCommentModule,
        PerfectSenseBlogAuthorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerfectSenseBlogEntityModule {}
