import { Injectable } from '@angular/core';
import {
    Comment,
    DwellingCommentCreate,
    DwellingService,
    ReservoirCommentCreate,
    ReservoirService,
    SpringSourceCommentCreate,
    SpringSourceService,
} from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { CommentConfig, CommentCreate, CommentType } from './type';

@Injectable({
    providedIn: 'root',
})
export class CommentManager {
    constructor(
        private svcDwelling: DwellingService,
        private svcReservoir: ReservoirService,
        private svcSpringSource: SpringSourceService
    ) {}

    public create(
        meta: CommentCreate
    ): Observable<DwellingCommentCreate | ReservoirCommentCreate | SpringSourceCommentCreate> {
        switch (meta.type) {
            case CommentType.DWELLING:
                return this.svcDwelling.createDwellingComment({
                    dwelling_id: meta.id,
                    message: meta.message,
                });
            case CommentType.RESERVOIR:
                return this.svcReservoir.createReservoirComment({
                    reservoir_id: meta.id,
                    message: meta.message,
                });

            case CommentType.SPRING_SOURCE:
                return this.svcSpringSource.createSpringSourceComment({
                    spring_source_id: meta.id,
                    message: meta.message,
                });
            default:
                throw new Error('Type provided ' + meta.type + ' is not valid for this operation');
        }
    }

    public load(meta: CommentConfig): Observable<Comment[]> {
        switch (meta.type) {
            case CommentType.DWELLING:
                return this.svcDwelling.getDwellingComments(meta.id);
            case CommentType.RESERVOIR:
                return this.svcReservoir.getReservoirComments(meta.id);
            case CommentType.SPRING_SOURCE:
                return this.svcSpringSource.getSpringSourceComments(meta.id);
            default:
                throw new Error('Type provided ' + meta.type + ' is not valid for this operation');
        }
    }
}
