import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Blog } from './blog.model';
import { BlogPopupService } from './blog-popup.service';
import { BlogService } from './blog.service';
import { Author, AuthorService } from '../author';
import { Comment, CommentService } from '../comment';

import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-blog-dialtog',
    templateUrl: './blog-dialog.component.html'
})
export class BlogDialogComponent implements OnInit {

    blog: Blog;
    isSaving: boolean;

    authors: Author[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private blogService: BlogService,
        private authorService: AuthorService,
        private commentService: CommentService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorService.query()
            .subscribe((res: ResponseWrapper) => { this.authors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.blog, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.blog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.blogService.update(this.blog));
        } else {
            this.subscribeToSaveResponse(
                this.blogService.create(this.blog));
        }
    }

    private subscribeToSaveResponse(result: Observable<Blog>) {
        result.subscribe((res: Blog) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Blog) {
        this.eventManager.broadcast({ name: 'blogListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAuthorById(index: number, item: Author) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-blog-popup',
    template: ''
})
export class BlogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blogPopupService: BlogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.blogPopupService
                    .open(BlogDialogComponent as Component, params['id']);
            } else {
                this.blogPopupService
                    .open(BlogDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
