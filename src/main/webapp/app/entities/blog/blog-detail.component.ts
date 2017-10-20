import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils, JhiAlertService } from 'ng-jhipster';

import { Observable } from 'rxjs/Rx';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import {Comment} from "../comment/comment.model";
import {CommentService} from "../comment/comment.service";

import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-blog-detail',
    templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit, OnDestroy {

    blog: Blog;
    comments: Comment [];
    isSaving: boolean;
    tempComment: String;
    tempID: number;
    addComment: String;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private blogService: BlogService,
        private commentService: CommentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        this.addComment= "";
        this.isSaving = false;
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlogs();
    }

    load(id) {
        this.blogService.find(id).subscribe((blog) => {
            this.blog = blog;
        });

        this.commentService.findByBlog(id)
            .subscribe((res: ResponseWrapper) => { this.comments = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));

    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlogs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blogListModification',
            (response) => this.load(this.blog.id)
        );
    }

    save() {

        this.tempComment = this.comments[0].comment;
        this.tempID = this.comments[0].id;

        this.comments[0].comment = this.addComment;
        this.comments[0].blog = this.blog;
        this.comments[0].id = undefined;

        this.isSaving = true;
        this.subscribeToSaveResponse(this.commentService.create(this.comments[0]));
    }

    private subscribeToSaveResponse(result: Observable<Comment>) {
        result.subscribe((res: Comment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Comment) {
        this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
        this.comments[0].comment = this.tempComment;
        this.comments[0].id = this.tempID;
        this.addComment= "";
        this.isSaving = false;
    }

    private onSaveError() {
        console.log("error?");
        this.isSaving = false;
    }

}
