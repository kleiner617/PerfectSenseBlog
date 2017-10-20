import { BaseEntity } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public comment?: any,
        public blog?: BaseEntity,
    ) {
    }
}
