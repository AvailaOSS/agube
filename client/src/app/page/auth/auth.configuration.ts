import { AgubeRestConfiguration } from '@availaoss/agube-rest-api';

export class AuthConfiguration {
    authRestconfig: AgubeRestConfiguration = {
        basePath: '',
    };
    afterLoginSuccessUrl: string = '';
    createAccountUrl: string = '';
}
