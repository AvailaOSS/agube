import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardButtonModule } from '../card-button/card-button.module';

@NgModule({
    declarations: [ClientComponent],
    imports: [
        CommonModule,
        ClientRoutingModule,
        MatCardModule,
        PipesModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        TranslateModule,
        MatTooltipModule,
        CardButtonModule,
    ],
})
export class ClientModule {}
