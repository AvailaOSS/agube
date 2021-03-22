import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ContactService } from './service/contact.service';
import { TagService } from './service/tag.service';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        ContactService,
        TagService
    ]
})
export class ContactBookApiModule {

    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ContactBookApiModule> {
        return {
            ngModule: ContactBookApiModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: ContactBookApiModule,
        @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ContactBookApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
