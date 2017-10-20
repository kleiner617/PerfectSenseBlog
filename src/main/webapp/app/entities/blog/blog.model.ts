import { BaseEntity } from './../../shared';

export class Blog implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public blogPost?: any,
        public date?: any,
        public imageContentType?: string,
        public image?: any,
        public comments?: BaseEntity[],
        public author?: BaseEntity,
    ) {
    }
}
