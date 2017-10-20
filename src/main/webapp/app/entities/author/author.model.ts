import { BaseEntity } from './../../shared';

export class Author implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public bio?: any,
        public imageContentType?: string,
        public image?: any,
        public blogs?: BaseEntity[],
    ) {
    }
}
