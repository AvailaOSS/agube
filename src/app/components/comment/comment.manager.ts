import { Injectable } from '@angular/core';
import { Comment, DwellingService } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { CommentConfig, CommentCreate, CommentType } from './type';

@Injectable({
    providedIn: 'root',
})
export class CommentManager {
    constructor(private svcDwelling: DwellingService) {}

    public create(meta: CommentCreate) {
        switch (meta.type) {
            case CommentType.DWELLING:
                return this.svcDwelling.createDwellingComment({
                    dwelling_id: meta.id,
                    message: meta.message,
                });
            // CREATE OBSERVATION spring source
            case CommentType.SPRING_SOURCE:
                return this.svcDwelling.createDwellingComment({
                    dwelling_id: meta.id,
                    message: meta.message,
                });
            default:
                throw new Error('Type provided ' + meta.type + ' is not valid for this operation');
        }
    }

      // FIX: loadSPRINGSOURCE
    public load(meta: CommentConfig): Observable<Comment[]> {
        switch (meta.type) {
            case CommentType.DWELLING:
                return this.svcDwelling.getDwellingComments(meta.id);
            case CommentType.SPRING_SOURCE:
                return this.svcDwelling.getDwellingComments(meta.id);
            default:
                throw new Error('Type provided ' + meta.type + ' is not valid for this operation');
        }
    }
}
